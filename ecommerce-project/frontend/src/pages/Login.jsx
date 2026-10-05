import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const data = await loginUser(
                email,
                password
            );

            // Save user + token through AuthContext
            login(data.user, data.token);

            alert("Login successful!");

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);

            alert(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>
        </div>
    );
}

export default Login;