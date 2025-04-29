const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsersByRole,
    getUsersByAnyParmas,
    findOwnerStadium,
    findUserByPhone,
    callProcedureUsers,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/create", createUser);
router.post("/stadiums-reviewed", findUserByPhone);
router.get("/all", getAllUsers);
router.get("/procedure", callProcedureUsers);
router.get("/role", getAllUsersByRole);
router.get("/any", getUsersByAnyParmas);
router.get("/ownerstadioum", findOwnerStadium);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
