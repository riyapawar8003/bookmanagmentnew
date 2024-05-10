// purchaseModel.js

const db = require("../db/connection");

function addPurchase(userId, bookId, returnDate, purchaseDate, callback) {
  const query =
    "INSERT INTO user_books (user_id, book_id, return_date, purchase_date, isReturn) VALUES (?, ?, ?, ?, 0)";
  const values = [userId, bookId, returnDate, purchaseDate];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error adding purchase:", err);
      return callback(err, null);
    }
    const purchaseDetails = {
      id: results.insertId,
      user_id: userId,
      book_id: bookId,
      return_date: returnDate,
      purchase_date: purchaseDate,
    };
    callback(null, purchaseDetails);
  });
}

function getUserBookPurchases(userId, callback) {
  const query = `
  SELECT user_books.id AS purchase_id, user_books.user_id, user_books.book_id, 
         user_books.purchase_date, user_books.return_date, user_books.isReturn,
         books.title, books.author, books.isbn, books.genre, books.publication_date
  FROM user_books
  JOIN books ON user_books.book_id = books.id
  WHERE user_books.user_id = ?
`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user book purchases:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
}

const updateReturnStatus = (user_id, book_id, isReturn, callback) => {
  console.log(user_id, book_id, isReturn);
  const query =
    "UPDATE user_books SET isReturn = ? WHERE user_id = ? AND book_id = ?";
  console.log(query);
  db.query(query, [isReturn, user_id, book_id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

function getTopPurchasedBooks(callback) {
  const query = `
  SELECT b.title, b.author, COUNT(ub.book_id) AS count
  FROM user_books AS ub
  INNER JOIN books AS b ON ub.book_id = b.id
  GROUP BY ub.book_id
  ORDER BY count DESC
  LIMIT 5
`;
  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

function getPurchaseByUserAndBook(userId, bookId, callback) {
  const query = "SELECT * FROM user_books WHERE user_id = ? AND book_id = ?";
  const values = [userId, bookId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error checking purchase:", err);
      return callback(err, null);
    }

    // If there are results, it means the user has already purchased the book
    // Return the purchase details, otherwise return null
    const purchase = results.length > 0 ? results[0] : null;
    callback(null, purchase);
  });
}

module.exports = {
  addPurchase,
  getPurchaseByUserAndBook,
};
module.exports = {
  addPurchase,
  getUserBookPurchases,
  updateReturnStatus,
  getTopPurchasedBooks,
  getPurchaseByUserAndBook,
};
