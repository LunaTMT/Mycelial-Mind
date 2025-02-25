import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
  total: number;
  addedAt?: number;  // Timestamp for when the item was added
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
  calculateSubtotal: () => string;
  calculateTotal: (promoDiscount: number) => string;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; // Provided setCart
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

  const estimatedDeliveryHandling = 5.0;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const uniqueItems = cart.length;


  // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

        // Auto-remove cart items after 10 seconds and update backend stock for each expired item
        useEffect(() => {
            const interval = setInterval(() => {
            const now = Date.now();
            setCart((prevCart) => {
                // Identify expired items
                const expiredItems = prevCart.filter(
                (item) => now - (item.addedAt ?? now) >= 10 * 1000
                );

                // For each expired item, update its stock in the backend
                expiredItems.forEach((item) => {
                axios
                    .get(route("item.stock", { id: item.id }))
                    .then(({ data }) => {
                    const currentStock = data.stock;

                    router.post(route("item.update", { id: item.id }), {
                        stock: currentStock + item.quantity,
                        current_url: window.location.href,
                      });                      
                    })
                    .catch((error) => {
                    console.error("Error updating stock for expired item", item.id, error);
                    toast.error("Could not update stock for expired item.");
                    });
                });

                // Return a new cart array with only non-expired items
                return prevCart.filter(
                (item) => now - (item.addedAt ?? now) < 10 * 1000
                );
            });
            }, 1000); // Check every second

            return () => clearInterval(interval);
        }, [setCart]);
    

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  

  const calculateTotal = (promoDiscount: number) => {
    const subtotal = parseFloat(calculateSubtotal());
    const discountAmount = (promoDiscount / 100) * subtotal;
    return (subtotal - discountAmount + estimatedDeliveryHandling).toFixed(2);
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        updatedCart[existingItemIndex].total =
          updatedCart[existingItemIndex].price * updatedCart[existingItemIndex].quantity;
        // Update the timestamp when the item is updated
        updatedCart[existingItemIndex].addedAt = Date.now();
        return updatedCart;
      } else {
        // Set the timestamp when a new item is added
        return [...prevCart, { ...item, addedAt: Date.now() }];
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

  return (
    <CartContext.Provider value={{
      cart, 
      scaled, 
      totalItems, 
      uniqueItems,
      calculateSubtotal,
      calculateTotal,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      triggerScale, 
      setCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
