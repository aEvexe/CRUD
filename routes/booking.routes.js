const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} = require("../controllers/booking.controller");

const router = require("express").Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;

