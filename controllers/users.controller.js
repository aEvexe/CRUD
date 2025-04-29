const db = require('../config/db');

const createUser = (req, res) => {
    const { role, first_name, last_name, email, password, phone } = req.body;

    if (!role || !first_name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `INSERT INTO users (role, first_name, last_name, email, password, phone)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [role, first_name, last_name, email, password, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "User created", id: result.insertId });
    });
};

const getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getUserById = (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};

const updateUser = (req, res) => {
    const { role, first_name, last_name, email, password, phone } = req.body;

    const sql = `UPDATE users SET role=?, first_name=?, last_name=?, email=?, password=?, phone=? WHERE id=?`;

    db.query(sql, [role, first_name, last_name, email, password, phone, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User updated" });
    });
};

const deleteUser = (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User deleted" });
    });
};

const getAllUsersByRole = (req, res) => {
  const { role } = req.body;
  db.query("SELECT * FROM users WHERE role = ?", [role], (error, result) => {
    if (error) {
      console.error("Error get all role:", error);
      return res.status(500).send("Error updating role");
    }
    res.status(200).send({ message: "Roles got successfully", data: result });
  });
};

const getUsersByAnyParmas = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  let where = "true";
  if (first_name) {
    where += `AND first_name like'%${first_name}%'`;
  }
  if (last_name) {
    where += `AND last_name like'%${last_name}%'`;
  }
  if (email) {
    where += `AND email like'%${email}%`;
  }
  if (phone) {
    where += `AND phone like'%${phone}%'`;
  }
  if (where == "true") {
    return res
      .status(400)
      .send({ message: "qidirish parametrlarini kiriting" });
  }
  db.query(`SELECT * FROM users WHERE ${where}`, (error, result) => {
    if (error) {
      console.error("Error get all role:", error);
      return res.status(500).send("Error updating role");
    }
    res.status(200).send({ message: "Roles got successfully" });
  });
};

const findOwnerStadium = (req, res) => {
  const { first_name, last_name } = req.body;
  db.query(
    `SELECT u.first_name, u.phone, f.name, i.image_url FROM users u 
     LEFT JOIN field f ON u.id = f.owner_id
     LEFT JOIN images i ON f.id = i.stadion_id
     WHERE first_name='${first_name}' and last_name='${last_name}'`,
    (error, result) => {
      if (error) {
        console.error("Error get owner:", error);
        return res.status(500).send("Error updating owner");
      }
      res.status(200).send({ message: "owner got successfully" });
    }
  );
};

const findUserByPhone = (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const sql = `
    SELECT s.*
    FROM users u
    JOIN review r ON u.id = r.user_id
    JOIN stadion s ON r.stadion_id = s.id
    WHERE u.phone = ?
  `;

  db.query(sql, [phone], (error, result) => {
    if (error) {
      console.error("Error getting stadiums by user phone:", error);
      return res.status(500).send("Server error while fetching stadiums");
    }

    res.status(200).json({
      message: "Stadiums reviewed by user fetched successfully",
      data: result
    });
  });
};

const callProcedureUsers = (req, res) => {
  db.query("call getAllUsers", (error, result) => {
      if (error) {
        console.error("Error get users:", error);
        return res.status(500).send("Error updating owner");
      }
      res.status(200).send({ message: "owner got successfully", data: result });
    })
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsersByRole,
    getUsersByAnyParmas,
    findOwnerStadium,
    findUserByPhone,
    callProcedureUsers
};