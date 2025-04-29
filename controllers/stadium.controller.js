const db = require("../config/db");

const createStadium = (req, res) => {
  const { name, location, address, description, price, owner_id } = req.body;

  if (!name || !location || !address || !description || !price || !owner_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `INSERT INTO stadium (name, location, address, description, price, owner_id)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [name, location, address, description, price, owner_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Stadium created", id: result.insertId });
    }
  );
};

const getAllStadiums = (req, res) => {
  db.query("SELECT * FROM stadium", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const getStadiumById = (req, res) => {
  db.query(
    "SELECT * FROM stadium WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "Stadium not found" });
      res.json(results[0]);
    }
  );
};

const updateStadium = (req, res) => {
  const { name, location, address, description, price, owner_id } = req.body;

  const sql = `UPDATE stadium SET name=?, location=?, address=?, description=?, price=?, owner_id=?
                 WHERE id=?`;

  db.query(
    sql,
    [name, location, address, description, price, owner_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Stadium updated" });
    }
  );
};

const deleteStadium = (req, res) => {
  db.query("DELETE FROM stadium WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Stadium deleted" });
  });
};

const findStadionBetPrice = (req, res) => {
  const { start_price, end_price } = req.body;

  db.query(
    `select s.name,s.address, s.location, s.price,  b.start_time, b.end_time from stadium s
     join booking b on s.id = b.stadion_id
     where s.price > ${start_price} and s.price < ${end_price} and 
     TIME_TO_SEC(TIMEDIFF(b.end_time, b.start_time)) >= 3600*2`,
    (error, result) => {
      if (error) {
        console.error("Error getting stadiums by price and duration:", error);
        return res.status(500).send("Server error while fetching stadiums");
      }

      res.status(200).json({
        message:
          "Stadiums with price in range and booking over 2 hours fetched successfully",
        data: result,
      });
    }
  );
};

module.exports = {
  createStadium,
  getAllStadiums,
  getStadiumById,
  updateStadium,
  deleteStadium,
  findStadionBetPrice,
};
