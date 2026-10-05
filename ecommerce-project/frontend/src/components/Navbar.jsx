import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { cart } = useCart();

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = () => {
        logout();

        alert("Logged out successfully");

        navigate("/");
    };

    return (
        <nav className="navbar">

            {/* LOGO */}

            <div className="logo">
                <Link to="/">
                    ShopKart
                </Link>
            </div>

            {/* NAVIGATION */}

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart">
                    Cart{" "}
                    {cartCount > 0 &&
                        `(${cartCount})`}
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link to="/orders">
                            My Orders
                        </Link>

                        <Link to="/profile">
                            Hi, {user?.name}
                        </Link>

                        <button
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;