const db = require('../config/db');

const createPayment = (req, res) => {
    const { booking_id, amount, payment_time, payment_method } = req.body;

    if (!booking_id || !amount || !payment_time || !payment_method) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `INSERT INTO payment (booking_id, amount, payment_time, payment_method)
                 VALUES (?, ?, ?, ?)`;

    db.query(sql, [booking_id, amount, payment_time, payment_method], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Payment recorded", id: result.insertId });
    });
};

const getAllPayments = (req, res) => {
    db.query("SELECT * FROM payment", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getPaymentById = (req, res) => {
    db.query("SELECT * FROM payment WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Payment not found" });
        res.json(results[0]);
    });
};

const updatePayment = (req, res) => {
    const { booking_id, amount, payment_time, payment_method } = req.body;
    const sql = `UPDATE payment SET booking_id=?, amount=?, payment_time=?, payment_method=? WHERE id=?`;

    db.query(sql, [booking_id, amount, payment_time, payment_method, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Payment updated" });
    });
};

const deletePayment = (req, res) => {
    db.query("DELETE FROM payment WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Payment deleted" });
    });
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};

