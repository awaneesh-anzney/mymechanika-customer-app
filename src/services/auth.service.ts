import api from "@/lib/axios";

export interface RegisterDto {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role?: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    status: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    // refreshToken is handled via HttpOnly cookie
}

export const authService = {
    register: async (data: RegisterDto): Promise<AuthResponse> => {
        const response = await api.post("/auth/register", data);
        return response.data;
    },

    login: async (data: LoginDto): Promise<AuthResponse> => {
        const response = await api.post("/auth/login", data);
        return response.data;
    },

    refreshToken: async (): Promise<{ accessToken: string }> => {
        const response = await api.post("/auth/refresh-token");
        return response.data;
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout API call failed", error);
        } finally {
            if (typeof window !== "undefined") {
                localStorage.removeItem("mymechanika-auth-context");
            }
        }
    },
};
