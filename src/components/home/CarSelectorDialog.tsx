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

import { carService, CarBrand } from "@/services/car.service";

// Generic Logo for fallback
const GENERIC_LOGO = "https://cdn-icons-png.flaticon.com/512/1598/1598196.png";

// ... MODELS and FUEL_TYPES constants can remain for now as user only requested Brands API ...
const MODELS: Record<string, string[]> = {
    // We need to map the new brand names (which might not match exactly with checks) or just use names.
    // However, the previous logic used brand IDs (lowercase names). The API returns UUIDs.
    // For this step, I will map the API `name` to the static `MODELS` keys loosely if possible, or just keep static MODELS for now.
    // The user instruction specifically asked to map the BRAND API.
    // Note: The `MODELS` dictionary keys (toyota, honda) might not match the UUIDs.
    // I will try to use the brand name (lowercase) to lookup models for now to preserve functionality.
    'Toyota': ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Camry'],
    'Honda': ['City', 'Amaze', 'Elevate', 'WR-V', 'Jazz'],
    'Hyundai': ['Creta', 'Venue', 'Verna', 'i20', 'Grand i10 Nios'],
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Dzire'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Punch', 'Tiago'],
    'Mahindra': ['XUV700', 'Thar', 'Scorpio-N', 'XUV300', 'Bolero'],
    'Kia': ['Seltos', 'Sonet', 'Carens', 'Carnival'],
    'BMW': ['3 Series', '5 Series', 'X1', 'X3', 'X5'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLA', 'GLC', 'S-Class'],
    'Audi': ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
};

const FUEL_TYPES = [
    { id: 'petrol', name: 'Petrol', icon: Droplet },
    { id: 'diesel', name: 'Diesel', icon: Fuel },
    { id: 'cng', name: 'CNG', icon: Flame },
    { id: 'electric', name: 'Electric', icon: Zap },
    { id: 'hybrid', name: 'Hybrid', icon: Leaf },
];

export function CarSelectorDialog() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [step, setStep] = React.useState<'brand' | 'model' | 'fuel'>('brand')

    // Data State
    const [brands, setBrands] = React.useState<CarBrand[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Selection State
    const [selectedBrand, setSelectedBrand] = React.useState<CarBrand | null>(null)
    const [selectedModel, setSelectedModel] = React.useState<string | null>(null)

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

    const handleBrandSelect = (brand: CarBrand) => {
        setSelectedBrand(brand)
        setStep('model')
    }

    const handleModelSelect = (model: string) => {
        setSelectedModel(model)
        setStep('fuel')
    }

    const handleFuelSelect = (fuel: typeof FUEL_TYPES[0]) => {
        console.log("Final Selection:", {
            brand: selectedBrand?.name,
            model: selectedModel,
            fuel: fuel.name
        })
        setIsOpen(false)
    }

    const handleBack = () => {
        if (step === 'model') {
            setStep('brand');
            setSelectedBrand(null);
        } else if (step === 'fuel') {
            setStep('model');
            setSelectedModel(null);
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-3xl overflow-hidden p-0 gap-0 bg-background/95 backdrop-blur-md border-border/40 shadow-2xl">
                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={handleClose}
                        className="rounded-full p-2 bg-background/50 hover:bg-muted transition-colors"
                    >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.1929 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.1929 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>

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
                            {isLoading && step === 'brand' && (
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
                            {step === 'model' && selectedBrand && (
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Lookup by Name since we updated keys to be capitalized names */}
                                    {MODELS[selectedBrand.name]?.map((model) => (
                                        <button
                                            key={model}
                                            onClick={() => handleModelSelect(model)}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                                        >
                                            <span className="text-base font-medium">{model}</span>
                                        </button>
                                    ))}
                                    {(!MODELS[selectedBrand.name] || MODELS[selectedBrand.name].length === 0) && (
                                        <p className="col-span-2 text-center text-muted-foreground py-10">No models found for {selectedBrand.name}.</p>
                                    )}
                                </div>
                            )}

                            {/* FUEL SELECTION */}
                            {step === 'fuel' && (
                                <div className="grid grid-cols-2 gap-3">
                                    {FUEL_TYPES.map((fuel) => (
                                        <button
                                            key={fuel.id}
                                            onClick={() => handleFuelSelect(fuel)}
                                            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            <div className="p-3 rounded-full bg-muted group-hover:bg-background transition-colors mb-4 shadow-sm">
                                                <fuel.icon className="w-8 h-8 text-primary" />
                                            </div>
                                            <span className="text-base font-medium">{fuel.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
