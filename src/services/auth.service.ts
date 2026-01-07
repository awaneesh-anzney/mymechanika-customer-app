import api from "@/lib/axios";

export interface RegisterDto {
    name: string;
    email: string;
    phone: string;
    password?: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };
    accessToken: string;
    refreshToken: string;
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

    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("mymechanika-auth-context");
        }
    },
};
