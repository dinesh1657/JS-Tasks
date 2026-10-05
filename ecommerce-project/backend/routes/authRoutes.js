const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const checkSql =
            "SELECT id FROM users WHERE email = ?";

        db.query(
            checkSql,
            [email],
            async (err, results) => {
                if (err) {
                    console.error(
                        "Database error:",
                        err
                    );

                    return res.status(500).json({
                        message: "Database error",
                    });
                }

                if (results.length > 0) {
                    return res.status(409).json({
                        message: "Email already registered",
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const insertSql = `
          INSERT INTO users
          (name, email, password)
          VALUES (?, ?, ?)
        `;

                db.query(
                    insertSql,
                    [
                        name,
                        email,
                        hashedPassword,
                    ],
                    (err, result) => {
                        if (err) {
                            console.error(
                                "Registration error:",
                                err
                            );

                            return res.status(500).json({
                                message:
                                    "Failed to register user",
                            });
                        }

                        res.status(201).json({
                            message:
                                "User registered successfully",
                            userId: result.insertId,
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error(
            "Server error:",
            error
        );

        res.status(500).json({
            message: "Server error",
        });
    }
});

// =========================
// LOGIN
// =========================

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message:
                "Email and password are required",
        });
    }

    const sql = `
    SELECT
      id,
      name,
      email,
      password,
      role
    FROM users
    WHERE email = ?
  `;

    db.query(
        sql,
        [email],
        async (err, results) => {
            if (err) {
                console.error(
                    "Database error:",
                    err
                );

                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message:
                        "Invalid email or password",
                });
            }

            const user = results[0];

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!passwordMatch) {
                return res.status(401).json({
                    message:
                        "Invalid email or password",
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            res.json({
                message: "Login successful",

                token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        }
    );
});

// =========================
// GET CURRENT USER PROFILE
// =========================

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {
        const userId = req.user.id;

        const sql = `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = ?
    `;

        db.query(
            sql,
            [userId],
            (err, results) => {
                if (err) {
                    console.error(
                        "Profile error:",
                        err
                    );

                    return res.status(500).json({
                        message:
                            "Failed to fetch profile",
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }

                res.json({
                    user: results[0],
                });
            }
        );
    }
);

module.exports = router;