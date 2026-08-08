require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const contactRoutes = require("./routes/contactRoutes");
const articleRoutes = require("./routes/articleRoutes");
const adminRoutes = require("./routes/adminRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { notFound } = require("./middleware/notFoundMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Server running🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);

// 404 handler for unknown routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Comment routes registered at /api/comments`);
});
