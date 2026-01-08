"use client"

import * as React from "react"
import { ArrowLeft, Droplet, Fuel, Flame, Zap, Leaf } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { carService, CarBrand, CarModel, CarFuelType } from "@/services/car.service";

// Generic Logo for fallback
const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png";

// Map fuel type strings to Icons
const FUEL_TYPE_ICONS: Record<string, any> = {
    'petrol': Droplet,
    'diesel': Fuel,
    'cng': Flame,
    'electric': Zap,
    'hybrid': Leaf,
};

export function CarSelectorDialog() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [step, setStep] = React.useState<'brand' | 'model' | 'fuel'>('brand')

    // Data State
    const [brands, setBrands] = React.useState<CarBrand[]>([]);
    const [models, setModels] = React.useState<CarModel[]>([]);
    const [fuelTypes, setFuelTypes] = React.useState<CarFuelType[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Selection State
    const [selectedBrand, setSelectedBrand] = React.useState<CarBrand | null>(null)
    const [selectedModel, setSelectedModel] = React.useState<CarModel | null>(null)

    React.useEffect(() => {
        // Open on mount
        setIsOpen(true);

        // Fetch Brands
        const fetchBrands = async () => {
            setIsLoading(true);
            const data = await carService.getCarBrands();
            // Sort by displayOrder
            const sorted = data.sort((a, b) => a.displayOrder - b.displayOrder);
            setBrands(sorted);
            setIsLoading(false);
        };
        fetchBrands();
    }, [])

    const handleBrandSelect = async (brand: CarBrand) => {
        setSelectedBrand(brand)
        setStep('model')
        setIsLoading(true);
        try {
            const fetchedModels = await carService.getCarModels(brand.id);
            setModels(fetchedModels);
        } catch (error) {
            console.error("Failed to load models", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleModelSelect = async (model: CarModel) => {
        setSelectedModel(model);
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
    }

    const handleFuelSelect = (fuel: CarFuelType) => {
        console.log("Final Selection:", {
            brand: selectedBrand?.name,
            model: selectedModel?.name,
            fuel: fuel.fuelType
        })
        setIsOpen(false)
    }

    const handleBack = () => {
        if (step === 'model') {
            setStep('brand');
            setSelectedBrand(null);
            setModels([]); // Clear models when going back
        } else if (step === 'fuel') {
            setStep('model');
            setSelectedModel(null);
            setFuelTypes([]); // Clear fuel types
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const getStepTitle = () => {
        switch (step) {
            case 'brand': return 'Select Your Car';
            case 'model': return 'Select Car Model';
            case 'fuel': return 'Select Fuel Type';
        }
    }

    const getStepDescription = () => {
        switch (step) {
            case 'brand': return 'Start by choosing your vehicle brand.';
            case 'model': return `Which ${selectedBrand?.name} model do you own?`;
            case 'fuel': return 'Select the fuel variant.';
        }
    }

    const getFuelIcon = (type: string) => {
        const normalizedType = type.toLowerCase();
        return FUEL_TYPE_ICONS[normalizedType] || Fuel; // Default to Fuel icon if unknown
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-3xl overflow-hidden p-0 gap-0 bg-background/95 backdrop-blur-md border-border/40 shadow-2xl">


                <div className="grid md:grid-cols-5 h-[80vh] md:h-[600px]">
                    {/* Left Sidebar / Illustration Area */}
                    <div className="hidden md:flex md:col-span-2 bg-muted/30 flex-col justify-between p-8 border-r border-border/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                        <div className="z-10">
                            {step !== 'brand' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleBack}
                                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                                </Button>
                            )}
                            <h2 className="text-3xl font-bold tracking-tight mb-2">
                                {getStepTitle()}
                            </h2>
                            <p className="text-muted-foreground text-base">
                                {getStepDescription()}
                            </p>
                        </div>

                        {/* Decorative Circle/Blob */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                        <div className="z-10 mt-auto">
                            <div className="flex items-center gap-2">
                                <div className={`h-2 rounded-full transition-all duration-500 ease-out ${step === 'brand' ? 'w-8 bg-primary' : 'w-2 bg-primary/30'}`} />
                                <div className={`h-2 rounded-full transition-all duration-500 ease-out ${step === 'model' ? 'w-8 bg-primary' : 'w-2 bg-primary/30'}`} />
                                <div className={`h-2 rounded-full transition-all duration-500 ease-out ${step === 'fuel' ? 'w-8 bg-primary' : 'w-2 bg-primary/30'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="md:col-span-3 p-6 md:p-8 flex flex-col h-full overflow-hidden bg-card/50">
                        <DialogHeader className="mb-6 md:hidden">
                            {step !== 'brand' && (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                                </button>
                            )}
                            <DialogTitle className="text-2xl">
                                {getStepTitle()}
                            </DialogTitle>
                            <DialogDescription>
                                {getStepDescription()}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
                            {/* LOADING STATE */}
                            {isLoading && (
                                <div className="flex items-center justify-center h-48">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            )}

                            {/* BRAND SELECTION */}
                            {step === 'brand' && !isLoading && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => handleBrandSelect(brand)}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 mb-3 relative flex items-center justify-center bg-gray-50 rounded-full p-2 group-hover:bg-white transition-colors">
                                                <img
                                                    src={brand.logoUrl || GENERIC_LOGO}
                                                    alt={brand.name}
                                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-center">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* MODEL SELECTION */}
                            {step === 'model' && selectedBrand && !isLoading && (
                                <div className="grid grid-cols-2 gap-3">
                                    {models.length > 0 ? (
                                        models.map((model) => (
                                            <button
                                                key={model.id}
                                                onClick={() => handleModelSelect(model)}
                                                className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                                            >
                                                <span className="text-base font-medium block">{model.name}</span>
                                                {model.segment && <span className="text-xs text-muted-foreground capitalize mt-1 block">{model.segment}</span>}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="col-span-2 text-center text-muted-foreground py-10">No models found for {selectedBrand.name}.</p>
                                    )}
                                </div>
                            )}

                            {/* FUEL SELECTION */}
                            {step === 'fuel' && !isLoading && (
                                <div className="grid grid-cols-2 gap-3">
                                    {fuelTypes.length > 0 ? (
                                        fuelTypes.map((fuel) => {
                                            const Icon = getFuelIcon(fuel.fuelType);
                                            return (
                                                <button
                                                    key={fuel.id}
                                                    onClick={() => handleFuelSelect(fuel)}
                                                    className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                                >
                                                    <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors mb-4 shadow-sm">
                                                        <Icon className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <span className="text-base font-medium capitalize">{fuel.fuelType}</span>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <p className="col-span-2 text-center text-muted-foreground py-10">No fuel types found for this model.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
