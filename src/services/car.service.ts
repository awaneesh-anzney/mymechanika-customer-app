import axios from '@/lib/axios';

export interface CarBrand {
    id: string;
    name: string;
    logoUrl: string | null;
    displayOrder: number;
}

export const carService = {
    getCarBrands: async (): Promise<CarBrand[]> => {
        try {
            const response = await axios.get('/cars/brands');
            return response.data;
        } catch (error) {
            console.error('Error fetching car brands:', error);
            return []; // Return empty array on error to prevent UI crash
        }
    }
};
