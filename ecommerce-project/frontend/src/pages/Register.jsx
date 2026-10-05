import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser(
                name,
                email,
                password
            );

            console.log("Register response:", data);

            alert("Registration successful!");

            navigate("/login");
        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            alert(
                error.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <h1>Create Account</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
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
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>
            </form>

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;