"use client";

import { Car, Wrench, Shield, Thermometer } from "lucide-react";
import ServiceCard from "@/components/services/services";

const heroServices = [
  {
    title: "General Maintenance",
    description: "Regular check-ups and oil changes to keep your car running.",
    price: "$99",
    rating: 4.8,
    duration: "1h",
    icon: Car,
  },
  {
    title: "Brake Services",
    description: "Complete brake inspection and pad replacement for safety.",
    price: "$149",
    rating: 4.9,
    duration: "2h",
    icon: Shield,
    featured: true,
  },
  {
    title: "Engine Diagnostics",
    description: "Advanced diagnostics to identify engine issues quickly.",
    price: "$89",
    rating: 4.7,
    duration: "45m",
    icon: Wrench,
  },
  {
    title: "AC Service",
    description: "Deep cleaning and gas top-up for peak performance.",
    price: "$199",
    rating: 4.8,
    duration: "3h",
    icon: Thermometer,
  },
];

export function HeroIllustration() {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {heroServices.map((service, index) => (
          <ServiceCard key={index} {...service} compact />
        ))}
      </div>
    </div>
  );
}
