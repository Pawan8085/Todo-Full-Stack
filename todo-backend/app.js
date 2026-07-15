const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


// Routes
app.use("/user", authRoutes);

app.use("/todos", todoRoutes);



// Global Error Handler
app.use(errorHandler);

module.exports = app;