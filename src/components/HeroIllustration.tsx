"use client";

import { Car, Wrench, Shield, Thermometer, Battery, CircleDashed, Clock, ArrowRight, PaintBucket, Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const heroServices = [
  {
    title: "Maintenance",
    price: "SAR 199",
    time: "45m",
    icon: Car,
    description: "Keep your car running smoothly with our comprehensive maintenance package.",
    features: ["Fluid Top-up", "Filter Check", "Safety Inspection"]
  },
  {
    title: "Brake Service",
    price: "SAR 299",
    time: "2h",
    icon: Shield,
    featured: true,
    description: "Ensure your safety with expert brake inspection and servicing.",
    features: ["Pad Replacement", "Rotor Check", "Fluid Flush"]
  },
  {
    title: "Diagnostics",
    price: "SAR 149",
    time: "30m",
    icon: Wrench,
    description: "Identify issues quickly with our advanced computer diagnostics.",
    features: ["Engine Scan", "Sensor Check", "Detailed Report"]
  },
  {
    title: "AC Service",
    price: "SAR 399",
    time: "3h",
    icon: Thermometer,
    description: "Stay cool with our complete air conditioning system service.",
    features: ["Gas Refill", "Leak Test", "Filter Cleaning"]
  },
  {
    title: "Battery",
    price: "SAR 249",
    time: "45m",
    icon: Battery,
    description: "Reliable battery replacement and health check services.",
    features: ["Voltage Test", "Terminal Clean", "Replacement"]
  },
  {
    title: "Tyres",
    price: "SAR 199",
    time: "1h",
    icon: CircleDashed,
    description: "Professional tyre services for a smoother, safer ride.",
    features: ["Alignment", "Balancing", "Rotation"]
  },
  {
    title: "Oil Change",
    price: "SAR 99",
    time: "30m",
    icon: PaintBucket,
    description: "Premium oil change service to protect your engine.",
    features: ["Synthetic Oil", "Filter Change", "Fluid Check"]
  },
  {
    title: "Detailing",
    price: "SAR 499",
    time: "4h",
    icon: Sparkles,
    description: "Restore your car's showroom shine inside and out.",
    features: ["Wash & Wax", "Interior Deep Clean", "Polishing"]
  },
  {
    title: "Emergency",
    price: "SAR 150",
    time: "20m",
    icon: AlertTriangle,
    description: "24/7 roadside assistance when you need it most.",
    features: ["Jump Start", "Flat Tyre", "Fuel Delivery"]
  },
];

export function HeroIllustration() {
  return (
    <div className="w-full flex justify-center lg:justify-end">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {heroServices.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group relative h-[160px] flex flex-col p-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card overflow-hidden",
              service.featured 
                ? "border-primary/50 bg-linear-to-br from-primary/5 to-transparent shadow-sm" 
                : "border-border hover:border-primary/30"
            )}
          >
            {/* Default View */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0">
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  service.featured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  <service.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
                  <Clock className="w-3 h-3" />
                  <span>{service.time}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-1">
                  {service.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">
                    {service.price}
                  </span>
                  <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full -mr-1">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hover View (Details) */}
            <div className="absolute inset-0 p-3 bg-card/95 backdrop-blur-md flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground text-xs">{service.title}</h3>
                <span className="font-bold text-primary text-xs">{service.price}</span>
              </div>
              
              <p className="text-[10px] text-muted-foreground leading-tight mb-2 line-clamp-2">
                {service.description}
              </p>
              
              <ul className="space-y-1 mb-auto">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-[10px] text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-primary mr-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button size="sm" className="w-full h-7 text-xs mt-2 rounded-lg">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
