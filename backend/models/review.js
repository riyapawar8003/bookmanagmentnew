const db = require("../db/connection");

// Function to add a new review
function addReview(message, userId, bookId, callback) {
  const query =
    "INSERT INTO reviews (message, user_id, book_id) VALUES (?, ?, ?)";
  db.query(query, [message, userId, bookId], (err, results) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null, results.insertId);
  });
}

function getReviews(callback) {
  const query =
    "SELECT r.id, u.email, b.title, r.message FROM reviews AS r INNER JOIN users AS u ON r.user_id = u.id INNER JOIN books AS b ON r.book_id = b.id";
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  getReviews,
  addReview,
};
