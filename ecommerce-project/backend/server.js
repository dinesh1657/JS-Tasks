const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        message: "E-Commerce Backend is running!",
    });
});

// =========================
// API TEST
// =========================

app.get("/api/test", (req, res) => {
    res.json({
        message: "API connection successful!",
    });
});

// =========================
// PUBLIC ROUTES
// =========================

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

// =========================
// ORDER ROUTES
// =========================

app.use("/api/orders", orderRoutes);

// =========================
// PROTECTED TEST ROUTE
// =========================

app.get(
    "/api/protected",
    authMiddleware,
    (req, res) => {
        res.json({
            message: "You accessed a protected route!",
            user: req.user,
        });
    }
);

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});