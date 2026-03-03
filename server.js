const express = require('express');
//const cors = require("cors"); // not needed when serving front‑end from same origin
const path = require('path');

const app = express();
// the backend listens on 5000 by default; the client will always call that port explicitly
// you can override with PORT environment variable if needed
const PORT = process.env.PORT || 5000;

/*app.use(cors({
    origin: "http://127.0.0.1:3000"
}));*/


// only parse JSON bodies; CORS is unnecessary since requests originate
// from the same host/port that serves the HTML/JS.
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

let bookings = [];

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

// POST route
app.post('/book', (req, res) => {

    bookings.push(req.body);
    console.log("New Booking:", req.body);
    res.json({ message: "Booking saved successfully" });
});

// GET route for admin
app.get('/bookings', (req, res) => {
    res.json(bookings);
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});