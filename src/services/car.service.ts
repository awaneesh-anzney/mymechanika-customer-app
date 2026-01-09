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

    addMyCar: async (data: AddMyCarPayload): Promise<UserCar> => {
        const response = await axios.post('/cars/my-cars', data);
        return response.data;
    },

    getMyCars: async (): Promise<UserCar[]> => {
        try {
            const response = await axios.get('/cars/my-cars');
            return response.data;
        } catch (error) {
            console.error('Error fetching my cars:', error);
            return [];
        }
    }
};

export interface UserCar {
    id: string;
    userId: string;
    brandId: string;
    brand: CarBrand;
    modelId: string;
    model: CarModel;
    fuelType: string;
    transmission: string;
    year: number;
    registrationNumber: string;
    color: string;
    engineCC: number | null;
    odometerReading: number | null;
    purchaseDate: string | null;
    nickname: string | null;
    carImage: string | null;
    carImagePublicId: string | null;
    isDefault: boolean;
    lastServiceDate: string | null;
    nextServiceDue: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface AddMyCarPayload {
    brandId: string;
    modelId: string;
    fuelTypeId: string;
    transmission: string;
    year: number;
    registrationNumber?: string;
    color?: string;
    odometerReading?: number;
    isDefault?: boolean;
}
