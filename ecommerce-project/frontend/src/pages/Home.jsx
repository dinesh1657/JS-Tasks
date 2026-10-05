import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { testBackend } from "../services/api";

function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        testBackend()
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>

            <section className="hero">
                <div>
                    <h1>Discover Products You'll Love</h1>

                    <p>
                        Shop the latest products at the best prices.
                    </p>

                    <Link to="/products">
                        <button>Shop Now</button>
                    </Link>

                    <h3>{message}</h3>
                </div>
            </section>

            <section className="categories">
                <h2>Shop By Category</h2>

                <div className="category-container">

                    <div className="category-card">
                        <h3>Electronics</h3>
                    </div>

                    <div className="category-card">
                        <h3>Fashion</h3>
                    </div>

                    <div className="category-card">
                        <h3>Shoes</h3>
                    </div>

                    <div className="category-card">
                        <h3>Accessories</h3>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default Home;