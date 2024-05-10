const reviewModel = require("../models/review");

// Function to add a new review
function addReview(req, res) {
  const { message, userId, bookId } = req.body;
  // Validation
  if (!message || !userId || !bookId) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  reviewModel.addReview(message, userId, bookId, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to add review" });
      return;
    }
    res.status(200).json({ data });
  });
}

function getReviews(req, res) {
  reviewModel.getReviews((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to get review" });
      return;
    }
    res
      .status(201)
      .json({ data });
  });
}

module.exports = {
  addReview,
  getReviews,
};
