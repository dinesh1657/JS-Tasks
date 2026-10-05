import { useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();

    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: user?.name || "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [loading, setLoading] = useState(false);

    // =========================
    // CALCULATE TOTAL
    // =========================

    const totalPrice = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * item.quantity,
        0
    );

    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((currentAddress) => ({
            ...currentAddress,
            [name]: value,
        }));
    };

    // =========================
    // PLACE ORDER
    // =========================

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Validate address
        if (
            !address.fullName ||
            !address.phone ||
            !address.addressLine ||
            !address.city ||
            !address.state ||
            !address.pincode
        ) {
            alert("Please fill all address fields");
            return;
        }

        // Check cart
        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            setLoading(true);

            // =========================
            // PREPARE ORDER DATA
            // =========================

            const orderData = {
                fullName: address.fullName,
                phone: address.phone,
                addressLine: address.addressLine,
                city: address.city,
                state: address.state,
                pincode: address.pincode,

                totalAmount: totalPrice,

                // ORDER ITEMS
                items: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: Number(item.price),
                })),
            };

            console.log(
                "Sending order:",
                orderData
            );

            // =========================
            // API CALL
            // =========================

            const data = await createOrder(
                orderData
            );

            console.log(
                "Order response:",
                data
            );

            // =========================
            // SUCCESS
            // =========================

            alert(
                `Order placed successfully!\nOrder ID: ${data.orderId}`
            );

            // Clear cart
            clearCart();

            // Go to orders page
            navigate("/orders");

        } catch (error) {
            console.error(
                "Order error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {
        return (
            <div className="checkout-page">

                <h1>Checkout</h1>

                <p>
                    Your cart is empty.
                </p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Continue Shopping
                </button>

            </div>
        );
    }

    // =========================
    // CHECKOUT PAGE
    // =========================

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <form
                onSubmit={handlePlaceOrder}
            >

                {/* =========================
            DELIVERY ADDRESS
        ========================= */}

                <div className="checkout-section">

                    <h2>
                        Delivery Address
                    </h2>

                    <div>
                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={address.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                        />
                    </div>

                    <div>
                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={address.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label>
                            Address
                        </label>

                        <textarea
                            name="addressLine"
                            value={address.addressLine}
                            onChange={handleChange}
                            placeholder="Enter full address"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                        />
                    </div>

                    <div>
                        <label>
                            State
                        </label>

                        <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                        />
                    </div>

                    <div>
                        <label>
                            Pincode
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleChange}
                            placeholder="Enter pincode"
                        />
                    </div>

                </div>

                {/* =========================
            ORDER SUMMARY
        ========================= */}

                <div className="checkout-section">

                    <h2>
                        Order Summary
                    </h2>

                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="checkout-item"
                        >

                            <div>
                                <h3>
                                    {item.name}
                                </h3>

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
                                    Number(item.price) *
                                    item.quantity
                                ).toFixed(2)}
                            </p>

                        </div>
                    ))}

                </div>

                {/* =========================
            TOTAL & PLACE ORDER
        ========================= */}

                <div className="checkout-total">

                    <h2>
                        Total: ₹
                        {totalPrice.toFixed(2)}
                    </h2>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Placing Order..."
                            : "Place Order"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Checkout;