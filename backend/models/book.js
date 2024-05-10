const db = require("../db/connection");

// Function to get all books
function getAllBooks(callback) {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

// Function to get book by ID
function getBookById(id, callback) {
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback({ message: "Book not found" }, null);
      return;
    }
    callback(null, results[0]);
  });
}

// Function to add a new book
function addBook(
  title,
  author,
  isbn,
  genre,
  publicationDate,
  availability,
  description,
  callback
) {
  const query =
    "INSERT INTO books (title, author, isbn, genre, publication_date, availability, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, author, isbn, genre, publicationDate, availability, description],
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results.insertId);
    }
  );
}

// Function to update a book
function updateBook(
  id,
  title,
  author,
  isbn,
  genre,
  publicationDate,
  availability,
  description,
  callback
) {
  console.log(title, author, isbn, genre, publicationDate, availability, description, id)
  const query =
    "UPDATE books SET title = ?, author = ?, isbn = ?, genre = ?, publication_date = ?, availability = ?, description = ? WHERE id = ?";
  console.log(id)
  db.query(
    query,
    [
      title,
      author,
      isbn,
      genre,
      publicationDate,
      availability,
      description,
      id,
    ],
    (err, results) => {
      console.log(err)
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    }
  );
}

// Function to delete a book
function deleteBook(id, callback) {
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
