import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCart } from "../context/cartContext";
import { getProductById } from "../services/api";

function ProductDetails() {
    const { id } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProductById(id);

                setProduct(data);
            } catch (error) {
                console.error("Product details error:", error);

                setError(
                    error.message || "Unable to load product"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <h2>Loading product...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="product-details">
            <div className="product-details-image">
                <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                />
            </div>

            <div className="product-details-info">
                <p>{product.category}</p>

                <h1>{product.name}</h1>

                <p>{product.description}</p>

                <h2>₹{product.price}</h2>

                <p>
                    Stock Available: {product.stock}
                </p>

                <button
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;