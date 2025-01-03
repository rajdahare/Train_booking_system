

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const seatsRoutes = require("./routes/seats.routes");
const pool = require("./config/db"); // PostgreSQL connection pool

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Test the PostgreSQL connection
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL successfully.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1); // Exit if the database connection fails
  }
})();

// Default route
app.get("/", (req, res) => {
  res.send("Unstop assignment - Train Seat Booking API is running.");
});

// Seats routes
app.use("/api/seats", seatsRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
