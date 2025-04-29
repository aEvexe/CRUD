const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/create", createPayment);
router.get("/all", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
