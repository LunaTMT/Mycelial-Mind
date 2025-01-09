import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    image: string;
    price: number;
    total: number;
}

interface CartContextType {
    cart: CartItem[];
    scaled: boolean;
    totalItems: number;
    uniqueItems: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    triggerScale: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedCart = (() => {
        try {
            const cartData = localStorage.getItem("cart");
            return cartData ? JSON.parse(cartData) : [];
        } catch (e) {
            console.error("Failed to parse cart from localStorage:", e);
            return [];
        }
    })();

    const [cart, setCart] = useState<CartItem[]>(storedCart);
    const [scaled, setScaled] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].price * updatedCart[existingItemIndex].quantity;
                return updatedCart;
            } else {
                return [...prevCart, item];
            }
        });
        triggerScale();
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity, total: item.price * quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const triggerScale = () => {
        setScaled(true);
        setTimeout(() => {
            setScaled(false);
        }, 300);
    };

    // Compute total items and unique items
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const uniqueItems = cart.length; // Simply the length of the cart array

    return (
        <CartContext.Provider value={{ 
            cart, 
            scaled, 
            totalItems, 
            uniqueItems,
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            triggerScale, 
        }}>
            {children}
        </CartContext.Provider>
    );
};
