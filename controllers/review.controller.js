const db = require('../config/db');

const createReview = (req, res) => {
    const { stadion_id, user_id, rating, comment } = req.body;

    if (!stadion_id || !user_id || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = "INSERT INTO review (stadion_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";

    db.query(sql, [stadion_id, user_id, rating, comment], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Review submitted", id: result.insertId });
    });
};

const getAllReviews = (req, res) => {
    db.query("SELECT * FROM review", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getReviewById = (req, res) => {
    db.query("SELECT * FROM review WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Review not found" });
        res.json(results[0]);
    });
};

const updateReview = (req, res) => {
    const { stadion_id, user_id, rating, comment } = req.body;
    const sql = `UPDATE review SET stadion_id=?, user_id=?, rating=?, comment=? WHERE id=?`;

    db.query(sql, [stadion_id, user_id, rating, comment, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Review updated" });
    });
};

const deleteReview = (req, res) => {
    db.query("DELETE FROM review WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Review deleted" });
    });
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};

