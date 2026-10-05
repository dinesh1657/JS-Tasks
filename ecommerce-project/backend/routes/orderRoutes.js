const express = require("express");

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// CREATE ORDER
// =========================

router.post("/", authMiddleware, (req, res) => {
    const userId = req.user.id;

    const {
        fullName,
        phone,
        addressLine,
        city,
        state,
        pincode,
        totalAmount,
        items,
    } = req.body;

    if (
        !fullName ||
        !phone ||
        !addressLine ||
        !city ||
        !state ||
        !pincode ||
        !totalAmount ||
        !items ||
        !Array.isArray(items) ||
        items.length === 0
    ) {
        return res.status(400).json({
            message:
                "All order details and items are required",
        });
    }

    db.getConnection(
        (connectionError, connection) => {
            if (connectionError) {
                console.error(
                    "Database connection error:",
                    connectionError
                );

                return res.status(500).json({
                    message:
                        "Database connection failed",
                });
            }

            connection.beginTransaction(
                (transactionError) => {
                    if (transactionError) {
                        connection.release();

                        return res.status(500).json({
                            message:
                                "Failed to start order transaction",
                        });
                    }

                    const orderSql = `
            INSERT INTO orders
            (
              user_id,
              full_name,
              phone,
              address_line,
              city,
              state,
              pincode,
              total_amount
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

                    connection.query(
                        orderSql,
                        [
                            userId,
                            fullName,
                            phone,
                            addressLine,
                            city,
                            state,
                            pincode,
                            totalAmount,
                        ],
                        (orderError, orderResult) => {
                            if (orderError) {
                                return connection.rollback(
                                    () => {
                                        connection.release();

                                        console.error(
                                            "Create order error:",
                                            orderError
                                        );

                                        res.status(500).json({
                                            message:
                                                "Failed to create order",
                                        });
                                    }
                                );
                            }

                            const orderId =
                                orderResult.insertId;

                            const itemValues = items.map(
                                (item) => [
                                    orderId,
                                    item.productId,
                                    item.quantity,
                                    item.price,
                                ]
                            );

                            const itemSql = `
                INSERT INTO order_items
                (
                  order_id,
                  product_id,
                  quantity,
                  price
                )
                VALUES ?
              `;

                            connection.query(
                                itemSql,
                                [itemValues],
                                (itemError) => {
                                    if (itemError) {
                                        return connection.rollback(
                                            () => {
                                                connection.release();

                                                console.error(
                                                    "Create order items error:",
                                                    itemError
                                                );

                                                res.status(500).json({
                                                    message:
                                                        "Failed to create order items",
                                                });
                                            }
                                        );
                                    }

                                    connection.commit(
                                        (commitError) => {
                                            if (commitError) {
                                                return connection.rollback(
                                                    () => {
                                                        connection.release();

                                                        res.status(500).json({
                                                            message:
                                                                "Failed to complete order",
                                                        });
                                                    }
                                                );
                                            }

                                            connection.release();

                                            res.status(201).json({
                                                message:
                                                    "Order created successfully",
                                                orderId,
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

// =========================
// GET MY ORDERS
// =========================

router.get(
    "/my-orders",
    authMiddleware,
    (req, res) => {
        const userId = req.user.id;

        const sql = `
      SELECT
        o.id AS order_id,
        o.full_name,
        o.phone,
        o.address_line,
        o.city,
        o.state,
        o.pincode,
        o.total_amount,
        o.status,
        o.created_at,

        oi.id AS item_id,
        oi.product_id,
        oi.quantity,
        oi.price,

        p.name AS product_name,
        p.image AS product_image

      FROM orders o

      LEFT JOIN order_items oi
        ON o.id = oi.order_id

      LEFT JOIN products p
        ON oi.product_id = p.id

      WHERE o.user_id = ?

      ORDER BY
        o.created_at DESC,
        oi.id ASC
    `;

        db.query(
            sql,
            [userId],
            (err, results) => {
                if (err) {
                    console.error(
                        "Fetch orders error:",
                        err
                    );

                    return res.status(500).json({
                        message:
                            "Failed to fetch orders",
                    });
                }

                const orders = {};

                results.forEach((row) => {
                    if (!orders[row.order_id]) {
                        orders[row.order_id] = {
                            id: row.order_id,
                            full_name: row.full_name,
                            phone: row.phone,
                            address_line:
                                row.address_line,
                            city: row.city,
                            state: row.state,
                            pincode: row.pincode,
                            total_amount:
                                row.total_amount,
                            status: row.status,
                            created_at:
                                row.created_at,
                            items: [],
                        };
                    }

                    if (row.item_id) {
                        orders[row.order_id].items.push({
                            id: row.item_id,
                            product_id:
                                row.product_id,
                            product_name:
                                row.product_name,
                            product_image:
                                row.product_image,
                            quantity:
                                row.quantity,
                            price: row.price,
                        });
                    }
                });

                res.json({
                    orders: Object.values(orders),
                });
            }
        );
    }
);

module.exports = router;