const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require("../controllers/review.controller");

const router = require("express").Router();

router.post("/create", createReview);
router.get("/all", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;

