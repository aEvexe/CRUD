const { 
    createStadium,
    getAllStadiums,
    getStadiumById,
    updateStadium,
    deleteStadium,
    findStadionBetPrice
} = require("../controllers/stadium.controller");

const router = require("express").Router();

router.post("/create", createStadium);
router.post("/bet", findStadionBetPrice);
router.get("/all", getAllStadiums);
router.get("/:id", getStadiumById);
router.put("/:id", updateStadium);
router.delete("/:id", deleteStadium);

module.exports = router;
