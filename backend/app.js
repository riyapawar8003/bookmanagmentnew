// app.js
const express = require("express");
const db = require("./db/connection"); // Require the database connection
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const buyRoutes = require("./routes/buyRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use("/books", bookRoutes);
app.use("/user", userRoutes);
app.use("/buy", buyRoutes);
app.use("/review", reviewRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
