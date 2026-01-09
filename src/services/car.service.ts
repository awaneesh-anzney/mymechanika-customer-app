import axios from '@/lib/axios';

export interface CarBrand {
    id: string;
    name: string;
    logoUrl: string | null;
    displayOrder: number;
}

export interface CarModel {
    id: string;
    name: string;
    segment: string;
}

export interface CarFuelType {
    id: string;
    fuelType: string;
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
    },

    getCarModels: async (brandId: string): Promise<CarModel[]> => {
        try {
            const response = await axios.get(`/cars/brands/${brandId}/models`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching car models for brand ${brandId}:`, error);
            return [];
        }
    },

    getCarFuelTypes: async (modelId: string): Promise<CarFuelType[]> => {
        try {
            const response = await axios.get(`/cars/models/${modelId}/fuel-types`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching fuel types for model ${modelId}:`, error);
            return [];
        }
    },

    addMyCar: async (data: AddMyCarPayload): Promise<any> => {
        const response = await axios.post('/cars/my-cars', data);
        return response.data;
    }
};

export interface AddMyCarPayload {
    brandId: string;
    modelId: string;
    fuelTypeId: string;
    transmission: string;
    year: number;
    registrationNumber?: string;
    color?: string;
    isDefault?: boolean;
}
