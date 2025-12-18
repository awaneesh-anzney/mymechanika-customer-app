"use client";

import React, { useState } from 'react';
import {
    Plus,
    ArrowLeft,
    Car,
    Fuel,
    Zap,
    Droplet,
    Flame,
    Leaf,
    Calendar,
    Gauge,
    MoreVertical,
    Clock,
    AlertCircle,
    CheckCircle2,
    CarFront
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

// Generic Logo for all brands as requested
const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png"; // Simple Car/Shield Icon

const BRANDS = [
    { id: 'toyota', name: 'Toyota', logoUrl: GENERIC_LOGO },
    { id: 'honda', name: 'Honda', logoUrl: GENERIC_LOGO },
    { id: 'hyundai', name: 'Hyundai', logoUrl: GENERIC_LOGO },
    { id: 'suzuki', name: 'Maruti Suzuki', logoUrl: GENERIC_LOGO },
    { id: 'tata', name: 'Tata Motors', logoUrl: GENERIC_LOGO },
    { id: 'mahindra', name: 'Mahindra', logoUrl: GENERIC_LOGO },
    { id: 'kia', name: 'Kia', logoUrl: GENERIC_LOGO },
    { id: 'bmw', name: 'BMW', logoUrl: GENERIC_LOGO },
    { id: 'mercedes', name: 'Benz', logoUrl: GENERIC_LOGO },
    { id: 'audi', name: 'Audi', logoUrl: GENERIC_LOGO },
];

const MODELS: Record<string, string[]> = {
    toyota: ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Camry'],
    honda: ['City', 'Amaze', 'Elevate', 'WR-V', 'Jazz'],
    hyundai: ['Creta', 'Venue', 'Verna', 'i20', 'Grand i10 Nios'],
    suzuki: ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Dzire'],
    tata: ['Nexon', 'Harrier', 'Safari', 'Punch', 'Tiago'],
    mahindra: ['XUV700', 'Thar', 'Scorpio-N', 'XUV300', 'Bolero'],
    kia: ['Seltos', 'Sonet', 'Carens', 'Carnival'],
    bmw: ['3 Series', '5 Series', 'X1', 'X3', 'X5'],
    mercedes: ['C-Class', 'E-Class', 'GLA', 'GLC', 'S-Class'],
    audi: ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
};

// Helper to get a proximate side-view image based on model type
const getModelImage = (model: string) => {
    const m = model.toLowerCase();

    // SUVs
    if (m.includes('fortuner') || m.includes('safari') || m.includes('xuv') || m.includes('harrier') || m.includes('scorpio') || m.includes('thar') || m.includes('creta') || m.includes('seltos') || m.includes('brezza') || m.includes('nexon') || m.includes('elevate') || m.includes('kushaq') || m.includes('taigun')) {
        return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80'; // White SUV Side
    }
    // Sedans
    if (m.includes('city') || m.includes('verna') || m.includes('ciaz') || m.includes('amaze') || m.includes('dzire') || m.includes('camry') || m.includes('slavia') || m.includes('virtus') || m.includes('aura')) {
        return 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=500&q=80'; // Silver Sedan
    }
    // Hatchbacks
    if (m.includes('swift') || m.includes('baleno') || m.includes('i20') || m.includes('glanza') || m.includes('tiago') || m.includes('altroz') || m.includes('jazz') || m.includes('i10') || m.includes('kwid')) {
        return 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=500&q=80'; // Hatchback
    }
    // Luxury
    if (m.includes('bmw') || m.includes('mercedes') || m.includes('audi') || m.includes('class') || m.includes('series')) {
        return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80'; // Luxury
    }

    // Default Fallback
    return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80'; // Generic Red Car
}

const FUEL_TYPES = [
    { id: 'petrol', name: 'Petrol', icon: Droplet },
    { id: 'diesel', name: 'Diesel', icon: Fuel },
    { id: 'cng', name: 'CNG', icon: Flame },
    { id: 'electric', name: 'Electric', icon: Zap },
    { id: 'hybrid', name: 'Hybrid', icon: Leaf },
];

const COLORS = [
    { name: 'White', class: 'bg-white border-gray-200' },
    { name: 'Black', class: 'bg-black border-black/10' },
    { name: 'Silver', class: 'bg-gray-300 border-gray-300' },
    { name: 'Grey', class: 'bg-gray-500 border-gray-500' },
    { name: 'Red', class: 'bg-red-600 border-red-600' },
    { name: 'Blue', class: 'bg-blue-600 border-blue-600' },
    { name: 'Brown', class: 'bg-amber-800 border-amber-800' },
    { name: 'Green', class: 'bg-green-700 border-green-700' },
];

type Step = 'list' | 'brand' | 'model' | 'fuel' | 'details';

interface VehicleData {
    brand: typeof BRANDS[0] | null;
    model: string | null;
    fuel: typeof FUEL_TYPES[0] | null;
    year: string;
    number: string;
    km: string;
    color: string;
}

export default function MyVehiclesPage() {
    const [step, setStep] = useState<Step>('list');
    const [formData, setFormData] = useState<VehicleData>({
        brand: null,
        model: null,
        fuel: null,
        year: '',
        number: '',
        km: '',
        color: ''
    });

    // Initial mock vehicles
    const [vehicles, setVehicles] = useState([
        {
            id: 1,
            brand: BRANDS[0], // Toyota
            model: 'Fortuner',
            fuel: FUEL_TYPES[1], // Diesel
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
            brand: BRANDS[1], // Honda
            model: 'City',
            fuel: FUEL_TYPES[0], // Petrol
            year: '2021',
            number: 'MH 02 XZ 9999',
            km: '28,150',
            color: 'Silver',
            image: getModelImage('City'),
            status: 'All Good',
            nextServiceDate: 'Feb 15, 2025'
        }
    ]);

    const handleBack = () => {
        if (step === 'brand') setStep('list');
        else if (step === 'model') setStep('brand');
        else if (step === 'fuel') setStep('model');
        else if (step === 'details') setStep('fuel');
    };

    const handleBrandSelect = (brand: typeof BRANDS[0]) => {
        setFormData(prev => ({ ...prev, brand, model: null }));
        setStep('model');
    };

    const handleModelSelect = (model: string) => {
        setFormData(prev => ({ ...prev, model }));
        setStep('fuel');
    };

    const handleFuelSelect = (fuel: typeof FUEL_TYPES[0]) => {
        setFormData(prev => ({ ...prev, fuel }));
        setStep('details');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newVehicle = {
            id: Date.now(),
            ...formData,
            image: formData.model ? getModelImage(formData.model) : '',
            status: 'All Good',
            nextServiceDate: 'Due in 6 months'
        } as any;
        setVehicles([...vehicles, newVehicle]);
        setFormData({ brand: null, model: null, fuel: null, year: '', number: '', km: '', color: '' });
        setStep('list');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* List View Header/Action */}
            {step === 'list' && (
                <div className="flex justify-end">
                    <Button onClick={() => setStep('brand')} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-105">
                        <Plus className="w-4 h-4 mr-2" /> Add New Vehicle
                    </Button>
                </div>
            )}

            {step === 'list' ? (
                // VIEW: LIST VEHICLES
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="group overflow-hidden border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 bg-card rounded-2xl h-fit">
                            {/* Card Image */}
                            <div className="relative h-44 w-full overflow-hidden">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.model}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                {/* Real Brand Logo (Generic now) */}
                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                                    <img
                                        src={vehicle.brand.logoUrl}
                                        alt={vehicle.brand.name}
                                        className="w-6 h-6 object-contain opacity-80"
                                    />
                                </div>

                                {/* Bottom Left: Reg Number */}
                                <div className="absolute bottom-3 left-4">
                                    <Badge variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white font-mono tracking-wide">
                                        {vehicle.number}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details Section */}
                            <CardContent className="p-5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground leading-tight">{vehicle.brand.name} {vehicle.model}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">{vehicle.year} • {vehicle.color}</p>
                                    </div>
                                    <Badge variant={vehicle.status === 'Service Due' ? "destructive" : "default"} className={cn(
                                        "capitalize",
                                        vehicle.status === 'All Good' && "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"
                                    )}>
                                        {vehicle.status}
                                    </Badge>
                                </div>

                                <Separator className="bg-border/50" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Gauge className="w-4 h-4 text-primary" />
                                        <span>{vehicle.km} km</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <vehicle.fuel.icon className="w-4 h-4 text-primary" />
                                        <span>{vehicle.fuel.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs bg-muted/40 p-2.5 rounded-lg text-muted-foreground border border-border/40">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Next Service: <span className="font-medium text-foreground">{vehicle.nextServiceDate}</span></span>
                                </div>

                                <Button className="w-full font-medium shadow-sm" variant={vehicle.status === 'Service Due' ? "default" : "outline"}>
                                    Book Service
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add Vehicle Placeholder Card */}
                    <button
                        onClick={() => setStep('brand')}
                        className="flex flex-col items-center justify-center h-full min-h-[350px] rounded-2xl border-2 border-dashed border-border/70 bg-muted/5 hover:bg-muted/20 hover:border-primary/50 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                            <Plus className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">Add New Vehicle</h3>
                        <p className="text-sm text-muted-foreground mt-1 text-center max-w-[200px]">Register another car to your garage</p>
                    </button>
                </div>
            ) : (
                // VIEW: WIZARD STEPS
                <div className="max-w-4xl mx-auto mt-4">
                    <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary transition-colors" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <Card className="border-border/60 shadow-xl overflow-hidden bg-gradient-to-b from-card to-muted/20">
                        <div className="h-1.5 w-full bg-muted">
                            <div
                                className="h-full bg-primary transition-all duration-700 ease-out"
                                style={{ width: step === 'brand' ? '25%' : step === 'model' ? '50%' : step === 'fuel' ? '75%' : '100%' }}
                            />
                        </div>
                        <CardContent className="p-8 min-h-[400px]">
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {step === 'brand' && "Select your Car Brand"}
                                    {step === 'model' && "Select your Car Model"}
                                    {step === 'fuel' && "What's the Fuel Type?"}
                                    {step === 'details' && "Enter Vehicle Details"}
                                </h2>
                                <p className="text-muted-foreground text-sm mt-2">
                                    {step === 'brand' && "Choose the manufacturer of your vehicle"}
                                    {step === 'model' && `Which ${formData.brand?.name} model do you own?`}
                                    {step === 'fuel' && "Select fuel variant for accurate service info"}
                                    {step === 'details' && "Almost done! Just a few more details."}
                                </p>
                            </div>

                            {/* STEP 1: BRAND SELECTION (Compact Cards + Generic Logo) */}
                            {step === 'brand' && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {BRANDS.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => handleBrandSelect(brand)}
                                            className="group flex flex-col items-center justify-center p-3 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm transition-all h-24 relative overflow-hidden"
                                        >
                                            <img
                                                src={brand.logoUrl}
                                                alt={brand.name}
                                                className="w-8 h-8 object-contain mb-2 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <span className="text-xs font-semibold text-center line-clamp-1">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2: MODEL SELECTION (Compact Cards) */}
                            {step === 'model' && formData.brand && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {MODELS[formData.brand.id]?.map((model) => (
                                        <button
                                            key={model}
                                            onClick={() => handleModelSelect(model)}
                                            className="group relative flex flex-col items-center p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-sm transition-all h-28 overflow-hidden bg-card text-left"
                                        >
                                            {/* Model Image */}
                                            <div className="w-full h-16 mb-2 flex items-center justify-center bg-muted/5 rounded-lg overflow-hidden">
                                                <img
                                                    src={getModelImage(model)}
                                                    alt={model}
                                                    className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <span className="font-semibold text-xs mt-auto w-full text-center group-hover:text-primary transition-colors">{model}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* STEP 3: FUEL SELECTION */}
                            {step === 'fuel' && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                                    {FUEL_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => handleFuelSelect(type)}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all"
                                        >
                                            <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors mb-3 shadow-sm">
                                                <type.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <span className="font-bold text-sm">{type.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* STEP 4: FINAL DETAILS */}
                            {step === 'details' && (
                                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto pt-4">
                                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                                        <div className="w-16 h-12 rounded-md overflow-hidden bg-white">
                                            <img src={formData.model ? getModelImage(formData.model) : ''} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{formData.brand?.name} {formData.model}</h3>
                                            <p className="text-sm text-muted-foreground">{formData.fuel?.name}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Year</Label>
                                                <Input placeholder="2022" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="h-11" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Color</Label>
                                                <Input placeholder="e.g. White" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} className="h-11" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Vehicle Number</Label>
                                            <Input placeholder="KA 01 AB 1234" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value.toUpperCase() })} className="h-11 uppercase font-mono" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Odometer Reading (KM)</Label>
                                            <Input placeholder="15000" type="number" value={formData.km} onChange={e => setFormData({ ...formData, km: e.target.value })} className="h-11" required />
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full mt-6 text-base font-semibold shadow-md">
                                        Complete & Add Vehicle
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
