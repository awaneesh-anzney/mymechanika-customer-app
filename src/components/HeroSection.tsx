"use client";

import { TrustBadge } from "./TrustBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocationSearch from "./locations/LocationSearch";
import RateView from "./RateView";

export function HeroSection() {

  return (
    <div className="flex flex-col gap-8">
      {/* Trust Badge */}
      <TrustBadge />

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          Get Your Car Serviced{" "}
          <span className="text-primary">in Minutes</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Premium car maintenance at your doorstep. Quality service, transparent
          pricing, and hassle-free experience guaranteed.
        </p>
      </div>

      {/* Location Input */}
       <LocationSearch />
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 h-12"
        >
          Book Service
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 h-12"
        >
          View All Services
        </Button>
      </div>

      {/* Rating */}
      <div className="-mt-10 flex items-center gap-2">
        <RateView />
      </div>  

    </div>
  );
}

