"use client";

import { Car, Wrench, Shield, Thermometer, Battery, CircleDashed, Clock, ArrowRight, PaintBucket, Sparkles, AlertTriangle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart-provider";
import { toast } from "sonner";

const heroServicesData = [
  {
    id: "maintenance",
    icon: Car,
  },
  {
    id: "brakes",
    icon: Shield,
    featured: true,
  },
  {
    id: "diagnostics",
    icon: Wrench,
  },
  {
    id: "ac",
    icon: Thermometer,
  },
  {
    id: "battery",
    icon: Battery,
  },
  {
    id: "tyres",
    icon: CircleDashed,
  },
  {
    id: "oil",
    icon: PaintBucket,
  },
  {
    id: "detailing",
    icon: Sparkles,
  },
  {
    id: "emergency",
    icon: AlertTriangle,
  },
];

export function HeroIllustration() {
  const { t, i18n } = useTranslation('services');
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeT = mounted ? t : i18n.getFixedT('en', 'services');

  const heroServices = heroServicesData.map(service => ({
    ...service,
    title: activeT(`heroIllustration.services.${service.id}.title`),
    price: activeT(`heroIllustration.services.${service.id}.price`),
    time: activeT(`heroIllustration.services.${service.id}.time`),
    description: activeT(`heroIllustration.services.${service.id}.description`),
    features: activeT(`heroIllustration.services.${service.id}.features`, { returnObjects: true }) as string[],
  }));

  const handleAddToCart = (service: any) => {
    addItem({
      id: service.id,
      title: service.title,
      price: service.price,
    });
    toast.success(`${service.title} added to cart`);
  };

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
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-foreground text-[11px] line-clamp-1">{service.title}</h3>
                <span className="font-bold text-primary text-[11px] whitespace-nowrap">{service.price}</span>
              </div>

              <p className="text-[9px] text-muted-foreground leading-tight mb-2 line-clamp-2">
                {service.description}
              </p>

              <ul className="space-y-0.5 mb-auto">
                {Array.isArray(service.features) && service.features.slice(0, 2).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-[9px] text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-primary mr-1.5 shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-1.5 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 w-7 p-0 shrink-0"
                  onClick={() => handleAddToCart(service)}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" className="flex-1 h-7 text-[10px] rounded-lg">
                  {activeT("heroIllustration.bookNow")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
