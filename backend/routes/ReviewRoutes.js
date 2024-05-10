const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateUser } = require('../middleware/verifyUser');

// Route to add a new review
router.post('/', authenticateUser, reviewController.addReview);
router.get('/', authenticateUser, reviewController.getReviews);
module.exports = router;