"use client";

import React, { useState } from 'react';
import {
    ArrowLeft,
    Droplet,
    Fuel,
    Flame,
    Zap,
    Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Generic Logo
const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png";

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

const FUEL_TYPES = [
    { id: 'petrol', name: 'Petrol', icon: Droplet },
    { id: 'diesel', name: 'Diesel', icon: Fuel },
    { id: 'cng', name: 'CNG', icon: Flame },
    { id: 'electric', name: 'Electric', icon: Zap },
    { id: 'hybrid', name: 'Hybrid', icon: Leaf },
];

interface AddVehicleWizardProps {
    onBack: () => void;
    onSubmit: (data: any) => void;
    getModelImage: (model: string) => string;
}

export const AddVehicleWizard = ({ onBack, onSubmit, getModelImage }: AddVehicleWizardProps) => {
    const [step, setStep] = useState<'brand' | 'model' | 'fuel' | 'details'>('brand');
    const [formData, setFormData] = useState<any>({
        brand: null,
        model: null,
        fuel: null,
        year: '',
        number: '',
        km: '',
        color: ''
    });

    const handleStepBack = () => {
        if (step === 'brand') onBack();
        else if (step === 'model') setStep('brand');
        else if (step === 'fuel') setStep('model');
        else if (step === 'details') setStep('fuel');
    };

    const handleBrandSelect = (brand: any) => {
        setFormData((prev: any) => ({ ...prev, brand, model: null }));
        setStep('model');
    };

    const handleModelSelect = (model: string) => {
        setFormData((prev: any) => ({ ...prev, model }));
        setStep('fuel');
    };

    const handleFuelSelect = (fuel: any) => {
        setFormData((prev: any) => ({ ...prev, fuel }));
        setStep('details');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary transition-colors" onClick={handleStepBack}>
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

                    {step === 'model' && formData.brand && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {MODELS[formData.brand.id]?.map((model) => (
                                <button
                                    key={model}
                                    onClick={() => handleModelSelect(model)}
                                    className="group relative flex flex-col items-center p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-sm transition-all h-28 overflow-hidden bg-card text-left"
                                >
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
    );
};
