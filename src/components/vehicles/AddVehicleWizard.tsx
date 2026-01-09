"use client";

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Droplet,
    Fuel,
    Flame,
    Zap,
    Leaf,
    Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { carService, CarBrand, CarModel, CarFuelType, AddMyCarPayload } from '@/services/car.service';

// Generic Logo
const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png";

// Map fuel type strings to Icons
const FUEL_TYPE_ICONS: Record<string, any> = {
    'petrol': Droplet,
    'diesel': Fuel,
    'cng': Flame,
    'electric': Zap,
    'hybrid': Leaf,
};

interface AddVehicleWizardProps {
    onBack: () => void;
    onSubmit: (data: any) => void;
    getModelImage: (model: string) => string;
}

export const AddVehicleWizard = ({ onBack, onSubmit, getModelImage }: AddVehicleWizardProps) => {
    const [step, setStep] = useState<'brand' | 'model' | 'fuel' | 'details'>('brand');

    // Data State
    const [brands, setBrands] = useState<CarBrand[]>([]);
    const [models, setModels] = useState<CarModel[]>([]);
    const [fuelTypes, setFuelTypes] = useState<CarFuelType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<{
        brand: CarBrand | null;
        model: CarModel | null;
        fuel: CarFuelType | null;
        year: string;
        number: string;
        km: string;
        color: string;
        transmission: 'MANUAL' | 'AUTOMATIC';
    }>({
        brand: null,
        model: null,
        fuel: null,
        year: '',
        number: '',
        km: '',
        color: '',
        transmission: 'MANUAL'
    });

    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);
            try {
                const data = await carService.getCarBrands();
                const sorted = data.sort((a, b) => a.displayOrder - b.displayOrder);
                setBrands(sorted);
            } catch (error) {
                console.error("Failed to load brands", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const handleStepBack = () => {
        if (step === 'brand') onBack();
        else if (step === 'model') {
            setStep('brand');
            setModels([]);
            setFormData((prev) => ({ ...prev, brand: null }));
        }
        else if (step === 'fuel') {
            setStep('model');
            setFuelTypes([]);
            setFormData((prev) => ({ ...prev, model: null }));
        }
        else if (step === 'details') {
            setStep('fuel');
            setFormData((prev) => ({ ...prev, fuel: null }));
        }
    };

    const handleBrandSelect = async (brand: CarBrand) => {
        setFormData((prev) => ({ ...prev, brand, model: null }));
        setStep('model');
        setIsLoading(true);
        try {
            const fetchedModels = await carService.getCarModels(brand.id);
            setModels(fetchedModels);
        } catch (error) {
            console.error("Failed to load models", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModelSelect = async (model: CarModel) => {
        setFormData((prev) => ({ ...prev, model }));
        setStep('fuel');
        setIsLoading(true);
        try {
            const fetchedFuelTypes = await carService.getCarFuelTypes(model.id);
            setFuelTypes(fetchedFuelTypes);
        } catch (error) {
            console.error("Failed to load fuel types", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFuelSelect = (fuel: CarFuelType) => {
        setFormData((prev) => ({ ...prev, fuel }));
        setStep('details');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.brand || !formData.model || !formData.fuel) {
            console.error("Missing required vehicle data");
            return;
        }

        setIsSubmitting(true);

        const payload: AddMyCarPayload = {
            brandId: formData.brand.id,
            modelId: formData.model.id,
            fuelTypeId: formData.fuel.id,
            transmission: formData.transmission.toLowerCase(),
            year: parseInt(formData.year),
            registrationNumber: formData.number.toUpperCase(),
            color: formData.color,
            odometerReading: parseInt(formData.km),
            isDefault: true
        };

        try {
            const newCar = await carService.addMyCar(payload);
            console.log("Vehicle added successfully:", newCar);
            onSubmit(newCar); // Pass the new car back to parent
        } catch (error) {
            console.error("Failed to add vehicle:", error);
            // Ideally show a toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    const getFuelIcon = (type: string) => {
        const normalizedType = type.toLowerCase();
        return FUEL_TYPE_ICONS[normalizedType] || Fuel;
    }

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary transition-colors" onClick={handleStepBack} disabled={isSubmitting}>
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

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            {step === 'brand' && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => handleBrandSelect(brand)}
                                            className="group flex flex-col items-center justify-center p-3 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm transition-all h-24 relative overflow-hidden"
                                        >
                                            <div className="w-8 h-8 mb-2 relative flex items-center justify-center">
                                                <img
                                                    src={brand.logoUrl || GENERIC_LOGO}
                                                    alt={brand.name}
                                                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-center line-clamp-1">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 'model' && formData.brand && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {models.length > 0 ? (
                                        models.map((model) => (
                                            <button
                                                key={model.id}
                                                onClick={() => handleModelSelect(model)}
                                                className="group relative flex flex-col items-center p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-sm transition-all h-28 overflow-hidden bg-card text-left"
                                            >
                                                <div className="w-full h-16 mb-2 flex items-center justify-center bg-muted/5 rounded-lg overflow-hidden">
                                                    <img
                                                        src={getModelImage(model.name)}
                                                        alt={model.name}
                                                        className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                                <span className="font-semibold text-xs mt-auto w-full text-center group-hover:text-primary transition-colors">{model.name}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="col-span-full text-center text-muted-foreground py-10">No models found for {formData.brand.name}.</p>
                                    )}
                                </div>
                            )}

                            {step === 'fuel' && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                                    {fuelTypes.length > 0 ? (
                                        fuelTypes.map((type) => {
                                            const Icon = getFuelIcon(type.fuelType);
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => handleFuelSelect(type)}
                                                    className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all"
                                                >
                                                    <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors mb-3 shadow-sm">
                                                        <Icon className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <span className="font-bold text-sm capitalize">{type.fuelType}</span>
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <p className="col-span-full text-center text-muted-foreground py-10">No fuel types found for this model.</p>
                                    )}
                                </div>
                            )}

                            {step === 'details' && (
                                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto pt-2">
                                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                                        <div className="w-16 h-12 rounded-md overflow-hidden bg-white">
                                            <img src={formData.model ? getModelImage(formData.model.name) : ''} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{formData.brand?.name} {formData.model?.name}</h3>
                                            <p className="text-sm text-muted-foreground capitalize">{formData.fuel?.fuelType}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Transmission Selection */}
                                        <div className="space-y-2">
                                            <Label>Transmission</Label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, transmission: 'MANUAL' })}
                                                    className={`h-11 rounded-md border text-sm font-medium transition-all flex items-center justify-center gap-2 ${formData.transmission === 'MANUAL'
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                                        }`}
                                                >
                                                    <Settings2 className="w-4 h-4" /> Manual
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, transmission: 'AUTOMATIC' })}
                                                    className={`h-11 rounded-md border text-sm font-medium transition-all flex items-center justify-center gap-2 ${formData.transmission === 'AUTOMATIC'
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                                        }`}
                                                >
                                                    <Zap className="w-4 h-4" /> Automatic
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Year</Label>
                                                <Input
                                                    placeholder="2022"
                                                    value={formData.year}
                                                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                                                    className="h-11"
                                                    required
                                                    type="number"
                                                    min="1990"
                                                    max={new Date().getFullYear() + 1}
                                                />
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

                                    <Button type="submit" size="lg" className="w-full mt-6 text-base font-semibold shadow-md" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                Adding...
                                            </div>
                                        ) : (
                                            "Complete & Add Vehicle"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
