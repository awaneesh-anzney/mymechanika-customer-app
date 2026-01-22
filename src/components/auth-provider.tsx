"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, AuthResponse, LoginDto, RegisterDto } from "@/services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginDto) => Promise<void>;
    register: (data: RegisterDto) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const savedAuth = localStorage.getItem("mymechanika-auth-context");
            if (savedAuth) {
                try {
                    const parsed = JSON.parse(savedAuth);
                    if (parsed.user && parsed.accessToken) {
                        setUser(parsed.user);
                    }
                } catch (e) {
                    console.error("Failed to parse auth context", e);
                    localStorage.removeItem("mymechanika-auth-context");
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const handleAuthResponse = (response: AuthResponse) => {
        localStorage.setItem("mymechanika-auth-context", JSON.stringify(response));
        setUser(response.user);
    };

    const login = async (data: LoginDto) => {
        try {
            const response = await authService.login(data);
            handleAuthResponse(response);
            toast.success("Login successful!");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            const response = await authService.register(data);
            handleAuthResponse(response);
            toast.success("Registration successful!");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            throw error;
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        router.push("/auth");
        toast.info("Logged out");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
