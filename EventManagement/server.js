const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let bookings = [];

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});