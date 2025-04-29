const db = require('../config/db');

const createBooking = (req, res) => {
    const { stadion_id, user_id, booking_date, start_time, end_time, total_price, status } = req.body;

    if (!stadion_id || !user_id || !booking_date || !start_time || !end_time || !total_price || !status) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [stadion_id, user_id, booking_date, start_time, end_time, total_price, status], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Booking created", id: result.insertId });
    });
};

const getAllBookings = (req, res) => {
    db.query("SELECT * FROM booking", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getBookingById = (req, res) => {
    db.query("SELECT * FROM booking WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Booking not found" });
        res.json(results[0]);
    });
};


const updateBooking = (req, res) => {
    const { stadion_id, user_id, booking_date, start_time, end_time, total_price, status } = req.body;
    const sql = `UPDATE booking SET stadion_id=?, user_id=?, booking_date=?, start_time=?, end_time=?, total_price=?, status=?
                 WHERE id=?`;

    db.query(sql, [stadion_id, user_id, booking_date, start_time, end_time, total_price, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Booking updated" });
    });
};

const deleteBooking = (req, res) => {
    db.query("DELETE FROM booking WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Booking deleted" });
    });
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};

