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
  },
  {
    title: "Brake Service",
    price: "SAR 299",
    time: "2h",
    icon: Shield,
    featured: true,
  },
  {
    title: "Diagnostics",
    price: "SAR 149",
    time: "30m",
    icon: Wrench,
  },
  {
    title: "AC Service",
    price: "SAR 399",
    time: "3h",
    icon: Thermometer,
  },
  {
    title: "Battery",
    price: "SAR 249",
    time: "45m",
    icon: Battery,
  },
  {
    title: "Tyres",
    price: "SAR 199",
    time: "1h",
    icon: CircleDashed,
  },
  {
    title: "Oil Change",
    price: "SAR 99",
    time: "30m",
    icon: PaintBucket,
  },
  {
    title: "Detailing",
    price: "SAR 499",
    time: "4h",
    icon: Sparkles,
  },
  {
    title: "Emergency",
    price: "SAR 150",
    time: "20m",
    icon: AlertTriangle,
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
              "group relative flex flex-col p-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card overflow-hidden",
              service.featured 
                ? "border-primary/50 bg-linear-to-br from-primary/5 to-transparent shadow-sm" 
                : "border-border hover:border-primary/30"
            )}
          >
            {/* Header with Icon and Time */}
            <div className="flex items-start justify-between mb-2">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                service.featured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
              )}>
                <service.icon className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
                <Clock className="w-3 h-3" />
                <span>{service.time}</span>
              </div>
            </div>
            
            {/* Title and Price */}
            <div className="mb-3">
              <h3 className="font-bold text-foreground text-xs mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                {service.title}
              </h3>
              <span className="font-bold text-primary text-sm">
                {service.price}
              </span>
            </div>

            {/* Book Button */}
            <Button 
              size="sm" 
              className={cn(
                "w-full mt-auto text-[10px] h-7 px-2", 
                service.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              Book
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
