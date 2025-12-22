"use client";

import React from 'react';
import {
    Plus,
    Gauge,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface VehicleListProps {
    vehicles: any[];
    onAddClick: () => void;
}

export const VehicleList = ({ vehicles, onAddClick }: VehicleListProps) => {
    return (
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

                        {/* Brand Logo */}
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                            <img
                                src={vehicle.brand?.logoUrl}
                                alt={vehicle.brand?.name}
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
                                <h3 className="font-bold text-lg text-foreground leading-tight">{vehicle.brand?.name} {vehicle.model}</h3>
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
                                {vehicle.fuel?.icon && <vehicle.fuel.icon className="w-4 h-4 text-primary" />}
                                <span>{vehicle.fuel?.name}</span>
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
                onClick={onAddClick}
                className="flex flex-col items-center justify-center h-full min-h-[350px] rounded-2xl border-2 border-dashed border-border/70 bg-muted/5 hover:bg-muted/20 hover:border-primary/50 transition-all duration-300 group"
            >
                <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Plus className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Add New Vehicle</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center max-w-[200px]">Register another car to your garage</p>
            </button>
        </div>
    );
};
