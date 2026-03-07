require('dotenv').config();
const express = require('express');
//const cors = require("cors"); // not needed when serving front‑end from same origin
const path = require('path');

const app = express();
// the backend listens on 5000 by default; the client will always call that port explicitly
// you can override with PORT environment variable if needed
const PORT = process.env.PORT || 5000;

// MySQL Database Connection
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'EventManagement'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

/*app.use(cors({
    origin: "http://127.0.0.1:3000"
}));*/


// only parse JSON bodies; CORS is unnecessary since requests originate
// from the same host/port that serves the HTML/JS.

//this statement converts the json format into an javascript object .
app.use(express.json());



// serve all static assets (HTML, CSS, JS, images, etc.) from the project root
// this means that visiting http://localhost:5000/index.html will deliver the
// front‑end, and fetch('/book') will target the same origin.
app.use(express.static(__dirname));

// global error handler for bad JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON body', err);
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next(err);
});

// mailer setup using nodemailer (requires `npm install nodemailer`)
// You'll need to configure these credentials with real SMTP settings.
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // example using Gmail SMTP - replace with your provider
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-email-password'
    }
});

// POST route for booking (saves to database)
app.post('/book', (req, res) => {
    const { name, email, phone, event_type, event_date, event_time, message } = req.body;

    if (!name || !email || !phone || !event_type || !event_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = "INSERT INTO bookings (name, email, phone, event_type, event_date, event_time, message) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, email, phone, event_type, event_date, event_time, message], (err, result) => {
        if (err) {
            console.error('Booking error:', err);
            res.status(500).json({ error: 'Failed to save booking' });
        } else {
            console.log("New Booking:", req.body);
            res.json({ message: "Booking saved successfully", bookingId: result.insertId });
        }
    });
});

// GET route for admin - fetch all bookings from database
app.get('/bookings', (req, res) => {
    const sql = "SELECT * FROM bookings ORDER BY event_date DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to fetch bookings' });
        } else {
            res.json(results);
        }
    });
});

// POST route for contact messages
app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone || null, message], (err, result) => {
        if (err) {
            console.error('Contact message error:', err);
            res.status(500).json({ error: 'Failed to save contact message' });
        } else {
            console.log("New Contact Message:", req.body);
            res.json({ message: "Contact message saved successfully", messageId: result.insertId });
        }
    });
});

// GET route for admin - fetch all contact messages
app.get('/contact-messages', (req, res) => {
    const sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to fetch contact messages' });
        } else {
            res.json(results);
        }
    });
});
// POST /send-email -> send a message to a client using booking info
app.post('/send-email', (req, res) => {
    console.log('POST /send-email body:', req.body);
    const { to, subject, text } = req.body || {};
    if (!to || !subject || !text) {
        console.warn('missing fields for email request', req.body);
        return res.status(400).json({ error: 'to, subject and text required' });
    }
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Mail error:', err);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent' });
    });
});

// File Upload Setup
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ message: "Image uploaded successfully" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/images", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read folder" });

    const imageUrls = files.map(file => `/uploads/${file}`);
    res.json(imageUrls);
  });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});