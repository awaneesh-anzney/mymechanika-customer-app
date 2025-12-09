import React from 'react'
import ServiceCard from '@/components/services/services'
import { Car, Wrench, Battery, Shield } from "lucide-react";

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
        <h1 className="text-3xl font-bold mb-8 text-foreground">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
        </div>
    </div>
  )
}

export default Page
