const bookModel = require("../models/book");

function getAllBooks(req, res) {
  bookModel.getAllBooks((err, books) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(books);
  });
}

function getBookById(req, res) {
  const id = req.params.id;
  bookModel.getBookById(id, (err, book) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json(book);
  });
}

function addBook(req, res) {
  const {
    title,
    author,
    isbn,
    genre,
    publicationDate,
    availability,
    description,
  } = req.body;
  // Validation
  if (
    !title ||
    !author ||
    !isbn ||
    !genre ||
    !publicationDate ||
    !availability ||
    !description
  ) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  bookModel.addBook(
    title,
    author,
    isbn,
    genre,
    publicationDate,
    availability,
    description,
    (err, newBookId) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add book" });
        return;
      }
      res
        .status(201)
        .json({ message: "Book added successfully", id: newBookId });
    }
  );
}

function updateBook(req, res) {
  const id = req.params.id;
  const {
    title,
    author,
    isbn,
    genre,
    publicationDate,
    availability,
    description,
  } = req.body;
  // Validation
  if (
    !title ||
    !author ||
    !isbn ||
    !genre ||
    !publicationDate ||
    !availability ||
    !description
  ) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  bookModel.updateBook(
    id,
    title,
    author,
    isbn,
    genre,
    publicationDate,
    availability,
    description,
    (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to update book" });
        return;
      }
      res.json({ message: "Book updated successfully" });
    }
  );
}

function deleteBook(req, res) {
  const id = req.params.id;
  bookModel.deleteBook(id, (err) => {
    if (err) {
      if (err.errno === 1451) {
        res
          .status(401)
          .json({ error: "Book Already Purchase by Student cannot delete." });

        return;
      }

      res.status(500).json({ error: "Failed to delete book" });
      return;
    }
    res.json({ message: "Book deleted successfully" });
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
