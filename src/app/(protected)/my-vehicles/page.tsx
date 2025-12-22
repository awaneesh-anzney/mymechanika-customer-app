"use client";

import React, { useState } from 'react';
import { VehicleList } from '@/components/vehicles/VehicleList';
import { AddVehicleWizard } from '@/components/vehicles/AddVehicleWizard';

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

    // Initial mock vehicles
    const [vehicles, setVehicles] = useState([
        {
            id: 1,
            brand: { id: 'toyota', name: 'Toyota', logoUrl: GENERIC_LOGO },
            model: 'Fortuner',
            fuel: { id: 'diesel', name: 'Diesel' },
            year: '2022',
            number: 'KA 01 AB 1234',
            km: '15,400',
            color: 'White',
            image: getModelImage('Fortuner'),
            status: 'Service Due',
            nextServiceDate: 'Tomorrow'
        },
        {
            id: 2,
            brand: { id: 'honda', name: 'Honda', logoUrl: GENERIC_LOGO },
            model: 'City',
            fuel: { id: 'petrol', name: 'Petrol' },
            year: '2021',
            number: 'MH 02 XZ 9999',
            km: '28,150',
            color: 'Silver',
            image: getModelImage('City'),
            status: 'All Good',
            nextServiceDate: 'Feb 15, 2025'
        }
    ]);

    const handleAddVehicle = (formData: any) => {
        const newVehicle = {
            id: Date.now(),
            ...formData,
            image: formData.model ? getModelImage(formData.model) : '',
            status: 'All Good',
            nextServiceDate: 'Due in 6 months'
        };
        setVehicles(prev => [...prev, newVehicle]);
        setView('list');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {view === 'list' ? (
                <VehicleList
                    vehicles={vehicles}
                    onAddClick={() => setView('add')}
                />
            ) : (
                <AddVehicleWizard
                    onBack={() => setView('list')}
                    onSubmit={handleAddVehicle}
                    getModelImage={getModelImage}
                />
            )}
        </div>
    );
}
