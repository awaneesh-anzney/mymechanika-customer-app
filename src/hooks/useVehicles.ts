import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carService, AddMyCarPayload } from '@/services/car.service';

// Query Keys
export const VEHICLE_KEYS = {
    all: ['vehicles'] as const,
    brands: () => [...VEHICLE_KEYS.all, 'brands'] as const,
    models: (brandId: string) => [...VEHICLE_KEYS.all, 'models', brandId] as const,
    fuelTypes: (modelId: string) => [...VEHICLE_KEYS.all, 'fuelTypes', modelId] as const,
    myCars: () => [...VEHICLE_KEYS.all, 'myCars'] as const,
};

// Hooks

export const useCarBrands = () => {
    return useQuery({
        queryKey: VEHICLE_KEYS.brands(),
        queryFn: carService.getCarBrands,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours - brands rarely change
    });
};

export const useCarModels = (brandId: string | null) => {
    return useQuery({
        queryKey: VEHICLE_KEYS.models(brandId || ''),
        queryFn: () => carService.getCarModels(brandId!),
        enabled: !!brandId, // Only fetch if brandId is present
        staleTime: 24 * 60 * 60 * 1000,
    });
};

export const useCarFuelTypes = (modelId: string | null) => {
    return useQuery({
        queryKey: VEHICLE_KEYS.fuelTypes(modelId || ''),
        queryFn: () => carService.getCarFuelTypes(modelId!),
        enabled: !!modelId,
        staleTime: 24 * 60 * 60 * 1000,
    });
};

export const useMyVehicles = () => {
    return useQuery({
        queryKey: VEHICLE_KEYS.myCars(),
        queryFn: carService.getMyCars,
    });
};

export const useAddVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddMyCarPayload) => carService.addMyCar(payload),
        onSuccess: () => {
            // Invalidate my cars query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.myCars() });
        },
    });
};
