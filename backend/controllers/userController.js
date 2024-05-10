const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { JSON_WEB_TOKEN_SECRET_KEY } = require("../config/key");

function getAllUsers(req, res) {
  userModel.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(users);
  });
}

function getUserById(req, res) {
  const id = req.params.id;
  userModel.getUserById(id, (err, user) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json(user);
  });
}

function addUser(req, res) {
  const { name, email, password, role } = req.body;
  // Validation
  if (!name || !email || !password || !role) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  userModel.addUser(name, email, password, role, (err, newUserId) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to add user" });
      return;
    }
    res.status(201).json({ message: "User added successfully", id: newUserId });
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    userModel.verifyPassword(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!result) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user);
      res.json({ token, id: user.id, role: user.role});
    });
  });
}

function logoutUser(req, res) {
  // You can simply clear the token from client-side storage
  // For example:
  // localStorage.removeItem('token');
  res.json({ message: "Logout successful" });
}

function generateToken(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JSON_WEB_TOKEN_SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );
  return token;
}

function updateUser(req, res) {
  const id = req.params.id;
  const { name, email, role } = req.body;
  // Validation
  if (!name || !email || !role) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  userModel.updateUser(id, name, email, role, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to update user" });
      return;
    }
    res.json({ message: "User updated successfully" });
  });
}

function deleteUser(req, res) {
  const id = req.params.id;
  userModel.deleteUser(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete user" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
