import api from "@/lib/axios";

export interface ServiceCategory {
    id: string;
    code: string;
    name: string;
    image: string;
}

export interface ServiceCategoriesResponse {
    success: boolean;
    message: string;
    location: null;
    data: ServiceCategory[];
    meta: {
        total: number;
        page: number;
        last_page: number;
    };
}

export const getServiceCategories = async (): Promise<ServiceCategoriesResponse> => {
    const response = await api.get("/services/categories");
    return response.data;
};

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    formattedPrice: string;
    originalPrice?: number;
    rating?: number;
    duration?: string;
    image?: string;
    isFeatured?: boolean;
    isAvailable: boolean;
}

export interface ServicesResponse {
    success: boolean;
    message: string;
    data: Service[];
}

export const getServices = async (categoryId?: string): Promise<ServicesResponse> => {
    if (categoryId && categoryId !== 'all') {
        const response = await api.get(`/services/categories/${categoryId}`);
        return response.data;
    }
    const response = await api.get("/services");
    return response.data;
};
