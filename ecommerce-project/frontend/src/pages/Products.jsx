import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/cartContext";
import { getProducts } from "../services/api";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts();

                setProducts(data);
            } catch (error) {
                console.error("Products error:", error);

                setError(
                    error.message || "Unable to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="products-page">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-page">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="products-page">
            <h1>All Products</h1>

            <div className="product-grid">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.id}
                    >
                        <div className="product-image">
                            <img
                                src={`/images/${product.image}`}
                                alt={product.name}
                            />
                        </div>

                        <div className="product-info">
                            <p className="product-category">
                                {product.category}
                            </p>

                            <h2>{product.name}</h2>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <h3>₹{product.price}</h3>

                            <p className="product-stock">
                                Stock: {product.stock}
                            </p>

                            <Link
                                to={`/products/${product.id}`}
                                className="details-button"
                            >
                                View Details
                            </Link>

                            <button
                                className="add-cart-button"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;