// buyBook controller

const purchaseModel = require("../models/buy");

function buyBook(req, res) {
  const { bookId, userId, returnDate } = req.body;

  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  if (isNaN(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "Invalid bookId" });
  }

  // Check if the user has already purchased the book
  purchaseModel.getPurchaseByUserAndBook(userId, bookId, (err, purchase) => {
    if (err) {
      return res.status(500).json({ error: "Failed to check purchase" });
    }

    if (purchase) {
      // If the user has already purchased the book, return an error
      return res
        .status(400)
        .json({ error: "Book already purchased" });
    }

    // If the book is not already purchased, proceed with the purchase
    const purchaseDate = new Date();

    purchaseModel.addPurchase(
      userId,
      bookId,
      returnDate,
      purchaseDate,
      (err, purchaseDetails) => {
        if (err) {
          return res.status(500).json({ error: "Failed to add purchase" });
        }
        res
          .status(200)
          .json({ message: "Book purchased successfully", purchaseDetails });
      }
    );
  });
}
const updateReturnStatus = (req, res) => {
  const { user_id, book_id, isReturn } = req.body;

  // Call the model function to update the isReturn value
  purchaseModel.updateReturnStatus(
    user_id,
    book_id,
    isReturn,
    (err, result) => {
      if (err) {
        console.error("Error updating return status:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Return status updated successfully" });
    }
  );
};

function getUserBookPurchases(req, res) {
  const userId = req.params.userId; // Assuming userId is passed in the request params

  // Call the model function to fetch user book purchases
  purchaseModel.getUserBookPurchases(userId, (err, purchases) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch user book purchases" });
    }
    res.status(200).json({ purchases });
  });
}

function getTopPurchasedBooks(req, res) {
  console.log("top book");
  purchaseModel.getTopPurchasedBooks((err, results) => {
    if (err) {
      console.error("Error fetching top purchased books:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
}

module.exports = {
  buyBook,
  getUserBookPurchases,
  updateReturnStatus,
  getTopPurchasedBooks,
};
