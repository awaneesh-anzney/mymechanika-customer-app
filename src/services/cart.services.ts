import api from "@/lib/axios";

export interface CartItem {
    id?: string;
    serviceId: string;
    quantity: number;
    price?: number;
    title?: string; // Optional, might come from backend
    // Add other fields as needed based on backend response
    service?: {
        name: string;
        price: number;
        // other service details
    }
}

export interface CartResponse {
    id: string;
    items: CartItem[];
    totalPrice?: number;
}

export interface AddToCartDto {
    serviceId: string;
    quantity: number;
    guestId?: string;
}

export interface SyncCartDto {
    guestId: string;
}

export const cartService = {
    addToCart: async (data: AddToCartDto) => {
        const response = await api.post("/cart/add", data);
        return response.data;
    },

    getCart: async (guestId?: string) => {
        // If guestId is present, we pass it as a query param. 
        // If the user is logged in, the auth header is handled by the axios interceptor.
        // We pass guestId even if logged in? No, typically if logged in we don't need guestId, 
        // unless we are merging. But 'getCart' is just reading.
        // User request: '?guestId=...' (for guest users).
        const params = guestId ? { guestId } : {};
        const response = await api.get("/cart", { params });
        return response.data;
    },

    syncCart: async (data: SyncCartDto) => {
        const response = await api.post("/cart/sync", data);
        return response.data;
    },

    removeFromCart: async (serviceId: string, guestId?: string) => {
        const params = guestId ? { guestId } : {};
        const response = await api.delete(`/cart/${serviceId}`, { params });
        return response.data;
    }
};
