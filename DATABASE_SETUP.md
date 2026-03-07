# Event Management Database Setup

## Prerequisites
- Node.js installed
- MySQL Server installed and running
- npm packages installed (`npm install`)

## Database Setup Steps

### Step 1: Create Database and Table
Open MySQL command line or MySQL Workbench and run:

```sql
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Or run the SQL file:
```
mysql -u root -p < database_setup.sql
```

### Step 2: Configure Environment Variables
The `.env` file is already created with your database credentials. Update if needed:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Ravindhar@2005*
DB_NAME=EventManagement
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### Step 3: Start the Server
```bash
npm start
```

Or manually:
```bash
node server.js
```

The server will run at `http://localhost:5000`

## API Endpoints

### POST `/book`
Save a new booking to the database
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "event_type": "Wedding",
    "event_date": "2026-05-15"
}
```

### GET `/bookings`
Retrieve all bookings from the database

### POST `/send-email`
Send email to customer
```json
{
    "to": "customer@example.com",
    "subject": "Booking Confirmation",
    "text": "Your booking has been confirmed"
}
```

### POST `/upload`
Upload event images (multipart/form-data)

### GET `/images`
Get all uploaded images

## Database Connection
The database is now connected using environment variables for security. All form data is automatically stored in the MySQL database.
