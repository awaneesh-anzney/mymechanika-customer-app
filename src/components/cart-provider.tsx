"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetCart, useAddToCart, useSyncCart, useRemoveFromCart } from "@/hooks/useCartQueries";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export interface CartItem {
    id: string; // This MUST be the serviceId/product UUID for deletion to work
    cartItemId?: string; // The ID of the item in the cart table (e.g. "2")
    title: string;
    price: string | number;
    icon?: any;
    quantity: number;
    serviceId?: string;
    currency?: string;
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

    const [hasSynced, setHasSynced] = useState(false);

    // Initialize guestId on client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if we already have a guestId
            let stored = localStorage.getItem("guestId");
            if (!stored && !isAuthenticated) {
                // Only create if not authenticated
                stored = crypto.randomUUID();
                localStorage.setItem("guestId", stored);
                setGuestId(stored);
            } else if (stored) {
                setGuestId(stored);
            }
        }
    }, [isAuthenticated]);

    const { data: cartData, isLoading } = useGetCart(guestId, isAuthenticated);
    const addToCartMutation = useAddToCart();
    const syncCartMutation = useSyncCart();
    const removeFromCartMutation = useRemoveFromCart();

    // Sync guest cart when user logs in
    useEffect(() => {
        // We only sync if:
        // 1. User is authenticated
        // 2. We have a guestId (meaning they were a guest)
        // 3. We haven't just synced (to prevent loops if mutation object changes)
        // 4. The mutation isn't currently pending
        if (isAuthenticated && guestId && !hasSynced && !syncCartMutation.isPending) {
            syncCartMutation.mutate({ guestId }, {
                onSuccess: () => {
                    console.log("Cart synced successfully");
                    setHasSynced(true);
                    // Clear guest session as it's merged
                    localStorage.removeItem("guestId");
                    setGuestId(null);
                },
                onError: (error) => {
                    console.error("Failed to sync cart", error);
                    // If error, we might want to retry or mark as synced to stop loop
                    // For now, let's mark as synced to prevent infinite loop on persistent error 
                    // (e.g. 400 bad request)
                    setHasSynced(true);
                }
            });
        }
    }, [isAuthenticated, guestId, hasSynced, syncCartMutation.isPending]);

    // Reset hasSynced if user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            setHasSynced(false);
            // If logged out and no guestId, generate one?
            // The first effect handles generation if !isAuthenticated.
        }
    }, [isAuthenticated]);

    // Map backend items to frontend CartItem structure
    const items: CartItem[] = (cartData?.items || []).map((item: any) => ({
        id: item.serviceId || item.id, // Use serviceId for ID to ensure delete works
        cartItemId: item.id,
        title: item.service?.name || item.title || "Service",
        price: item.price || item.service?.basePrice || 0,
        quantity: item.quantity || 1,
        serviceId: item.serviceId,
        currency: item.currency || "SAR"
    }));

    const addItem = (item: Partial<CartItem> & { id: string }) => {
        const serviceId = item.id;
        const quantity = item.quantity || 1;
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
        const effectiveGuestId = isAuthenticated ? undefined : (guestId || undefined);

        removeFromCartMutation.mutate({
            serviceId: id,
            guestId: effectiveGuestId
        }, {
            onSuccess: () => {
                toast.success("Removed from cart");
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to remove from cart");
            }
        });
    };

    const clearCart = () => {
        // TODO: Implement clear cart API
        console.warn("Clear cart not implemented yet via API");
        toast.info("Clear cart coming soon");
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const totalPriceVal = items.reduce((acc, item) => {
        const priceVal = item.price;
        let numericPrice = 0;
        if (typeof priceVal === 'number') {
            numericPrice = priceVal;
        } else {
            const strPrice = String(priceVal || "0");
            numericPrice = parseFloat(strPrice.replace(/[^0-9.]/g, ""));
        }
        return acc + (isNaN(numericPrice) ? 0 : numericPrice) * item.quantity;
    }, 0);

    const totalPrice = totalPriceVal.toFixed(2);

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
