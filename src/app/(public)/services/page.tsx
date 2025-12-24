"use client";
import React, { useState, useEffect } from 'react'
import ServiceCard from '@/components/services/services'
import { Car, Wrench, Battery, Shield, Thermometer, CircleDashed, Sparkles, PaintBucket } from "lucide-react";
import { useTranslation } from "react-i18next";

const servicesData = [
  {
    id: "general",
    price: "$99",
    rating: 4.8,
    duration: "1h",
    icon: Car,
  },
  {
    id: "brakes",
    price: "$149",
    originalPrice: "$189",
    rating: 4.9,
    duration: "2h",
    icon: Shield,
    featured: true,
  },
  {
    id: "engine",
    price: "$89",
    rating: 4.7,
    duration: "45m",
    icon: Wrench,
  },
  {
    id: "ac",
    price: "$199",
    originalPrice: "$249",
    rating: 4.8,
    duration: "3h",
    icon: Thermometer,
    featured: true,
  },
  {
    id: "wheel",
    price: "$79",
    rating: 4.7,
    duration: "1h",
    icon: CircleDashed,
  },
  {
    id: "spa",
    price: "$249",
    originalPrice: "$299",
    rating: 4.9,
    duration: "4h",
    icon: Sparkles,
    featured: true,
  },
  {
    id: "paint",
    price: "$299",
    rating: 4.8,
    duration: "24h",
    icon: PaintBucket,
  },
  {
    id: "battery",
    price: "$129",
    rating: 4.8,
    duration: "30m",
    icon: Battery,
  },
];

const Page = () => {
  const { t, i18n } = useTranslation('services');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeT = mounted ? t : i18n.getFixedT('en', 'services');

  const services = servicesData.map(service => ({
    ...service,
    title: activeT(`items.${service.id}.title`),
    description: activeT(`items.${service.id}.description`),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 mt-5">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <Wrench className="w-4 h-4" />
          {activeT("badge")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {activeT("title")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {activeT("subtitle")}
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
