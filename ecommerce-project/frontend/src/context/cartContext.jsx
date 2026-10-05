import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // =========================
    // ADD TO CART
    // =========================

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            // Product already in cart
            if (existingProduct) {
                // Check stock
                if (
                    existingProduct.quantity >=
                    product.stock
                ) {
                    alert(
                        "Maximum available stock reached"
                    );

                    return currentCart;
                }

                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            // Product out of stock
            if (product.stock <= 0) {
                alert("Product is out of stock");

                return currentCart;
            }

            // Add new product
            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    // =========================
    // REMOVE FROM CART
    // =========================

    const removeFromCart = (productId) => {
        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== productId
            )
        );
    };

    // =========================
    // UPDATE QUANTITY
    // =========================

    const updateQuantity = (
        productId,
        quantity
    ) => {
        setCart((currentCart) =>
            currentCart.map((item) => {
                if (item.id !== productId) {
                    return item;
                }

                const newQuantity = Math.max(
                    1,
                    Math.min(quantity, item.stock)
                );

                return {
                    ...item,
                    quantity: newQuantity,
                };
            })
        );
    };

    // =========================
    // CLEAR CART
    // =========================

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// =========================
// USE CART HOOK
// =========================

export function useCart() {
    return useContext(CartContext);
}