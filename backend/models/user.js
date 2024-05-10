const db = require("../db/connection");
const bcrypt = require("bcrypt");

// Function to get all users
function getAllUsers(callback) {
  const query = "SELECT id, name, email, role FROM users";
  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

// Function to get user by ID
function getUserById(id, callback) {
  const query = "SELECT id, name, email, role FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback({ message: "User not found" }, null);
      return;
    }
    callback(null, results[0]);
  });
}

// Function to add a new user
function addUser(name, email, password, role, callback) {
  // Generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
      return;
    }
    // Hash the password with the salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        callback(err);
        return;
      }
      // Store the hashed password in the database
      const query =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, hashedPassword, role], (err, results) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, results.insertId);
      });
    });
  });
}

// Function to update a user
function updateUser(id, name, email, role, callback) {
  const query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
  db.query(query, [name, email, role, id], (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// Function to delete a user
function deleteUser(id, callback) {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// Function to get user by email
function getUserByEmail(email, callback) {
  const query =
    "SELECT id, name, email, password, role FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback(null, null);
      return;
    }
    callback(null, results[0]);
  });
}

// Function to verify user password
function verifyPassword(password, hashedPassword, callback) {
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  verifyPassword,
};
