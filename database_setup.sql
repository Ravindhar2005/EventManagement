-- Create EventManagement Database
CREATE DATABASE IF NOT EXISTS EventManagement;
USE EventManagement;

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
