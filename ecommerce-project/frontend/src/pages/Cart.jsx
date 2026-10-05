import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const totalPrice = cart.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    const handleCheckout = () => {
        console.log("Checkout button clicked");
        console.log("Authenticated:", isAuthenticated);

        if (!isAuthenticated) {
            alert("Please login before checkout");
            navigate("/login");
            return;
        }

        navigate("/checkout");
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h1>Your Cart</h1>

                <p>Your cart is empty.</p>

                <button
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            <div className="cart-items">
                {cart.map((item) => (
                    <div
                        className="cart-item"
                        key={item.id}
                    >
                        <div>
                            <h2>{item.name}</h2>

                            <p>
                                ₹{Number(item.price).toFixed(2)}
                            </p>

                            <p>
                                Available Stock: {item.stock}
                            </p>
                        </div>

                        <div className="quantity-controls">
                            <button
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                                disabled={
                                    item.quantity >= item.stock
                                }
                            >
                                +
                            </button>
                        </div>

                        <p>
                            Subtotal: ₹
                            {(
                                Number(item.price) *
                                item.quantity
                            ).toFixed(2)}
                        </p>

                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>
                    Total: ₹{totalPrice.toFixed(2)}
                </h2>

                <button onClick={clearCart}>
                    Clear Cart
                </button>

                <button onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;