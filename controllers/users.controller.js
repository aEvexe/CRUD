const db = require("../config/db");

// ** Frontenddan kelayotkan ma'lumotlar paramsda bodyda ,queryda keladi
const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
            INSERT INTO users (first_name, last_name,email,password,phone,role) 
            VALUES (?,?,?,?,?,?) 
            `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log(`Error adding new user`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi user qo'shildi", userId: result.insertId });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users where id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
