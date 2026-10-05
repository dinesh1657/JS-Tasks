const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({
                message: "Failed to fetch products",
            });
        }

        res.json(results);
    });
});

// Get single product
router.get("/:id", (req, res) => {
    const productId = req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error("Error fetching product:", err);

            return res.status(500).json({
                message: "Failed to fetch product",
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(results[0]);
    });
});

module.exports = router;