import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyOrders();

                setOrders(data.orders || []);
            } catch (error) {
                console.error(
                    "Orders error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>{error}</p>
            </div>
        );
    }

    // =========================
    // NO ORDERS
    // =========================

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>

                <p>
                    You haven't placed any
                    orders yet.
                </p>
            </div>
        );
    }

    // =========================
    // ORDERS
    // =========================

    return (
        <div className="orders-page">

            <h1>My Orders</h1>

            <div className="orders-list">

                {orders.map((order) => (
                    <div
                        className="order-card"
                        key={order.id}
                    >

                        {/* =========================
                ORDER HEADER
            ========================= */}

                        <div className="order-header">

                            <h2>
                                Order #{order.id}
                            </h2>

                            <span>
                                {order.status}
                            </span>

                        </div>

                        {/* =========================
                ORDER DATE
            ========================= */}

                        <p>
                            <strong>
                                Order Date:
                            </strong>{" "}
                            {new Date(
                                order.created_at
                            ).toLocaleDateString()}
                        </p>

                        {/* =========================
                ORDER ITEMS
            ========================= */}

                        <div className="order-products">

                            <h3>
                                Ordered Products
                            </h3>

                            {order.items &&
                                order.items.map(
                                    (item) => (
                                        <div
                                            className="order-product"
                                            key={item.id}
                                        >

                                            <div>
                                                <h4>
                                                    {item.product_name}
                                                </h4>

                                                <p>
                                                    Quantity:{" "}
                                                    {item.quantity}
                                                </p>

                                                <p>
                                                    Price: ₹
                                                    {Number(
                                                        item.price
                                                    ).toFixed(2)}
                                                </p>
                                            </div>

                                            <p>
                                                Subtotal: ₹
                                                {(
                                                    Number(
                                                        item.price
                                                    ) *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </p>

                                        </div>
                                    )
                                )}

                        </div>

                        {/* =========================
                TOTAL
            ========================= */}

                        <div className="order-total">

                            <h2>
                                Total: ₹
                                {Number(
                                    order.total_amount
                                ).toFixed(2)}
                            </h2>

                        </div>

                        {/* =========================
                DELIVERY ADDRESS
            ========================= */}

                        <div className="order-address">

                            <h3>
                                Delivery Address
                            </h3>

                            <p>
                                {order.full_name}
                            </p>

                            <p>
                                {order.phone}
                            </p>

                            <p>
                                {order.address_line}
                            </p>

                            <p>
                                {order.city},{" "}
                                {order.state} -{" "}
                                {order.pincode}
                            </p>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Orders;