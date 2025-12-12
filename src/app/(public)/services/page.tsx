import React from 'react'
import ServiceCard from '@/components/services/services'
import { Car, Wrench, Battery, Shield, Thermometer, CircleDashed, Sparkles, PaintBucket } from "lucide-react";

const services = [
  {
    title: "General Maintenance",
    description: "Regular check-ups, oil changes, and fluid top-ups to keep your car running smoothly.",
    price: "$99",
    rating: 4.8,
    duration: "1h",
    icon: Car,
  },
  {
    title: "Brake Services",
    description: "Complete brake inspection, pad replacement, and rotor resurfacing for your safety.",
    price: "$149",
    originalPrice: "$189",
    rating: 4.9,
    duration: "2h",
    icon: Shield,
    featured: true,
  },
  {
    title: "Engine Diagnostics",
    description: "Advanced computer diagnostics to identify and fix engine issues quickly.",
    price: "$89",
    rating: 4.7,
    duration: "45m",
    icon: Wrench,
  },
  {
    title: "AC Service & Repair",
    description: "Deep cleaning, gas top-up, and cooling system inspection for peak performance.",
    price: "$199",
    originalPrice: "$249",
    rating: 4.8,
    duration: "3h",
    icon: Thermometer,
    featured: true,
  },
  {
    title: "Wheel Care",
    description: "Wheel alignment, balancing, and tyre rotation for a smoother, safer ride.",
    price: "$79",
    rating: 4.7,
    duration: "1h",
    icon: CircleDashed,
  },
  {
    title: "Car Spa & Detailing",
    description: "Interior deep cleaning, exterior polishing, and ceramic coating for a showroom shine.",
    price: "$249",
    originalPrice: "$299",
    rating: 4.9,
    duration: "4h",
    icon: Sparkles,
    featured: true,
  },
  {
    title: "Denting & Painting",
    description: "Professional scratch removal and premium paint services to restore your car's look.",
    price: "$299",
    rating: 4.8,
    duration: "24h",
    icon: PaintBucket,
  },
  {
    title: "Battery Replacement",
    description: "Testing and replacement of old batteries with high-quality new ones.",
    price: "$129",
    rating: 4.8,
    duration: "30m",
    icon: Battery,
  },
];

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-12">
         <div className="text-center mb-12 mt-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Wrench className="w-4 h-4" />
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premium Car Care Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From routine maintenance to complex repairs, we've got your car covered with expert service and genuine parts.
            </p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
        </div>
    </div>
  )
}

export default Page
