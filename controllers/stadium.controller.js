const db = require('../config/db');

// CREATE stadium
const createStadium = (req, res) => {
    const { name, location, address, description, price, owner_id } = req.body;

    if (!name || !location || !address || !description || !price || !owner_id) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `INSERT INTO stadium (name, location, address, description, price, owner_id)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, location, address, description, price, owner_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Stadium created", id: result.insertId });
    });
};

// GET all stadiums
const getAllStadiums = (req, res) => {
    db.query("SELECT * FROM stadium", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// GET stadium by ID
const getStadiumById = (req, res) => {
    db.query("SELECT * FROM stadium WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Stadium not found" });
        res.json(results[0]);
    });
};

// UPDATE stadium
const updateStadium = (req, res) => {
    const { name, location, address, description, price, owner_id } = req.body;

    const sql = `UPDATE stadium SET name=?, location=?, address=?, description=?, price=?, owner_id=?
                 WHERE id=?`;

    db.query(sql, [name, location, address, description, price, owner_id, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Stadium updated" });
    });
};

// DELETE stadium
const deleteStadium = (req, res) => {
    db.query("DELETE FROM stadium WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Stadium deleted" });
    });
};

module.exports = {
    createStadium,
    getAllStadiums,
    getStadiumById,
    updateStadium,
    deleteStadium
};
