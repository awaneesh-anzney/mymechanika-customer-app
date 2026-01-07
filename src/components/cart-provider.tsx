"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    title: string;
    price: string;
    icon?: any;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        // When saving, we don't need to do anything special as functions
        // are automatically removed by JSON.stringify
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            // Check if item already exists
            if (prev.find((i) => i.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.length;

    const totalPrice = items.reduce((total, item) => {
        // Basic price parsing, assuming price is like "$100" or similar
        const priceStr = String(item.price || "0");
        const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
        return total + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0).toFixed(2);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
