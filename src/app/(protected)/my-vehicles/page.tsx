"use client";

import React, { useState } from 'react';
import { VehicleList } from '@/components/vehicles/VehicleList';
import { AddVehicleWizard } from '@/components/vehicles/AddVehicleWizard';
import { useMyVehicles } from '@/hooks/useVehicles';
import { Droplet, Fuel, Flame, Zap, Leaf } from 'lucide-react';
import { UserCar } from '@/services/car.service';

// Helper to get a proximate side-view image based on model type
const getModelImage = (model: string) => {
    const m = model.toLowerCase();
    if (m.includes('fortuner') || m.includes('safari') || m.includes('xuv') || m.includes('harrier') || m.includes('scorpio') || m.includes('thar') || m.includes('creta') || m.includes('seltos') || m.includes('brezza') || m.includes('nexon') || m.includes('elevate') || m.includes('kushaq') || m.includes('taigun')) {
        return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80'; // White SUV Side
    }
    if (m.includes('city') || m.includes('verna') || m.includes('ciaz') || m.includes('amaze') || m.includes('dzire') || m.includes('camry') || m.includes('slavia') || m.includes('virtus') || m.includes('aura')) {
        return 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=500&q=80'; // Silver Sedan
    }
    if (m.includes('swift') || m.includes('baleno') || m.includes('i20') || m.includes('glanza') || m.includes('tiago') || m.includes('altroz') || m.includes('jazz') || m.includes('i10') || m.includes('kwid')) {
        return 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=500&q=80'; // Hatchback
    }
    if (m.includes('bmw') || m.includes('mercedes') || m.includes('audi') || m.includes('class') || m.includes('series')) {
        return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80'; // Luxury
    }
    return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80';
}

const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png";

export default function MyVehiclesPage() {
    const [view, setView] = useState<'list' | 'add'>('list');

    // Use React Query hook
    const { data: rawVehicles, isLoading, isError } = useMyVehicles();

    // Transform data
    const vehicles = React.useMemo(() => {
        if (!rawVehicles) return [];

        return rawVehicles.map((car: UserCar) => {
            // Map fuel icons
            let FuelIcon = Droplet; // Default
            const ft = car.fuelType.toLowerCase();
            if (ft === 'diesel') FuelIcon = Fuel;
            if (ft === 'cng') FuelIcon = Flame;
            if (ft === 'electric') FuelIcon = Zap;
            if (ft === 'hybrid') FuelIcon = Leaf;

            return {
                id: car.id,
                brand: {
                    id: car.brand.id,
                    name: car.brand.name,
                    logoUrl: car.brand.logoUrl || GENERIC_LOGO
                },
                model: car.model.name,
                fuel: {
                    id: car.fuelType,
                    name: car.fuelType,
                    icon: FuelIcon
                },
                year: car.year.toString(),
                number: car.registrationNumber,
                km: car.odometerReading ? car.odometerReading.toLocaleString() : 'N/A',
                color: car.color,
                image: car.carImage || getModelImage(car.model.name),
                status: 'All Good', // Mock status
                nextServiceDate: 'Unknown' // Mock date
            };
        });
    }, [rawVehicles]);

    const handleAddVehicleSuccess = (newVehicle: any) => {
        // Query invalidation in the mutation will trigger a refetch automatically
        setView('list');
    };

    if (isError) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                Failed to load vehicles. Please try again later.
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {view === 'list' ? (
                <>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <VehicleList
                            vehicles={vehicles}
                            onAddClick={() => setView('add')}
                        />
                    )}
                </>
            ) : (
                <AddVehicleWizard
                    onBack={() => setView('list')}
                    onSubmit={handleAddVehicleSuccess}
                    getModelImage={getModelImage}
                />
            )}
        </div>
    );
}
