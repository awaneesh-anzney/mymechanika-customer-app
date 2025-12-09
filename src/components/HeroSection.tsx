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
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="text"
            placeholder="Enter your location..."
            className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[120px] h-12 border-gray-300">
            <SelectValue placeholder="Detect" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto Detect</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-6">
          <Search className="h-5 w-5 mr-2" />
          Find Services
        </Button>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 h-12"
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
    </div>
  );
}

