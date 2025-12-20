"use client"
import React from 'react';
import { Car, MapPin, Star, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const RateView = () => {
  const { t } = useTranslation('home');

  const stats = [
    { value: "2M+", label: t("stats.cars"), icon: Car },
    { value: "1000+", label: t("stats.centers"), icon: Building2 },
    { value: "4.8", label: t("stats.rating"), icon: Star },
    { value: "50+", label: t("stats.cities"), icon: MapPin },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-3 p-3 rounded-full bg-primary/10 text-primary">
              <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="text-2xl md:text-4xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RateView;
