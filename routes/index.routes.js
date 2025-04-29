const router = require("express").Router();
const usersRoute = require('./users.routes')
const stadiumRoute = require('./stadium.routes')
const bookingRoute = require('./booking.routes')
const paymentRoute = require('./payment.routes')
const reviewRoute = require('./review.routes')

router.use("/users", usersRoute)
router.use("/stadium", stadiumRoute)
router.use("/booking", bookingRoute)
router.use("/payment", paymentRoute)
router.use("/review", reviewRoute)

module.exports = router;
