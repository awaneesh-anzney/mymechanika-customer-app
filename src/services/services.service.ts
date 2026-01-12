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
