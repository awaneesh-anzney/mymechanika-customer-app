"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetCart, useAddToCart, useSyncCart } from "@/hooks/useCartQueries";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export interface CartItem {
    id: string; // Cart Item ID or Service ID depending on backend
    title: string;
    price: string | number;
    icon?: any;
    quantity: number;
    serviceId?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Partial<CartItem> & { id: string }) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: string;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [guestId, setGuestId] = useState<string | null>(null);

    // Initialize guestId on client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            let stored = localStorage.getItem("guestId");
            if (!stored) {
                stored = crypto.randomUUID();
                localStorage.setItem("guestId", stored);
            }
            setGuestId(stored);
        }
    }, []);

    const { data: cartData, isLoading } = useGetCart(guestId, isAuthenticated);
    const addToCartMutation = useAddToCart();
    const syncCartMutation = useSyncCart();

    // Sync guest cart when user logs in
    useEffect(() => {
        if (isAuthenticated && guestId) {
            syncCartMutation.mutate({ guestId }, {
                onSuccess: () => {
                    // Optional: Clear guestId or handle sync success
                    console.log("Cart synced successfully");
                    // We might want to remove guestId from storage to avoid re-syncing, 
                    // but we need to generate a new one if they logout.
                    // For now, we keep it but the backend should handle idempotent capabilities.
                },
                onError: (error) => {
                    console.error("Failed to sync cart", error);
                }
            });
        }
    }, [isAuthenticated, guestId, syncCartMutation]);

    // Map backend items to frontend CartItem structure
    // Assuming backend returns { items: [{ id, serviceId, quantity, service: { name, price, ... } }] }
    // We try to gracefully handle missing fields
    const items: CartItem[] = (cartData?.items || []).map((item: any) => ({
        id: item.id || item.serviceId,
        title: item.service?.name || item.title || "Service",
        price: item.service?.price || item.price || 0,
        quantity: item.quantity || 1,
        // We might not get icon from backend, preserve if possible or use default in UI
        serviceId: item.serviceId,
    }));

    const addItem = (item: Partial<CartItem> & { id: string }) => {
        const serviceId = item.id;
        const quantity = item.quantity || 1;

        // If not authenticated, we must have a guestId
        // If authenticated, we pass guestId only if logic requires (e.g. merge), 
        // but typically backend reads token.
        // We pass guestId if we have it, as the API allows it.
        const effectiveGuestId = isAuthenticated ? undefined : (guestId || undefined);

        addToCartMutation.mutate({
            serviceId,
            quantity,
            guestId: effectiveGuestId
        }, {
            onSuccess: () => {
                toast.success("Added to cart");
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to add to cart");
            }
        });
    };

    const removeItem = (id: string) => {
        // TODO: Implement remove item API
        console.warn("Remove item not implemented yet via API");
        toast.info("Remove item coming soon");
    };

    const clearCart = () => {
        // TODO: Implement clear cart API
        console.warn("Clear cart not implemented yet via API");
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = items.reduce((acc, item) => {
        // Handle price being string "$100" or number 100
        const priceVal = item.price;
        let numericPrice = 0;
        if (typeof priceVal === 'number') {
            numericPrice = priceVal;
        } else {
            const strPrice = String(priceVal || "0");
            numericPrice = parseFloat(strPrice.replace(/[^0-9.]/g, ""));
        }
        return acc + (isNaN(numericPrice) ? 0 : numericPrice) * item.quantity;
    }, 0).toFixed(2);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice, isLoading }}>
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
