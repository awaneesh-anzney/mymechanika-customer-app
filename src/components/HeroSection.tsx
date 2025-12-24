"use client";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const router = useRouter();
  const { t, i18n } = useTranslation('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeT = mounted ? t : i18n.getFixedT('en', 'home');

  return (
    <div className="flex flex-col gap-8">
      {/* Trust Badge */}
      <TrustBadge />

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          {activeT("hero.title")}{" "}
          <span className="text-primary">{activeT("hero.titleAccent")}</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          {activeT("hero.description")}
        </p>
      </div>

      {/* Location Input */}
      <LocationSearch />
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 h-12 w-full sm:w-auto"
        >
          {activeT("hero.bookButton")}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 h-12 w-full sm:w-auto"
          onClick={() => router.push("/services")}
        >
          {activeT("hero.viewServices")}
        </Button>
      </div>
    </div>
  );
}

