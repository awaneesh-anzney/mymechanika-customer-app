"use client"
import React from 'react'
import { Shield, Clock, Star, CheckCircle2 } from 'lucide-react'
import { useTranslation } from "react-i18next";

const WhyChoose = () => {
  const { t } = useTranslation('home');

  const features = [
    {
      icon: Shield,
      title: t("whyChoose.features.quality.title"),
      description: t("whyChoose.features.quality.description"),
    },
    {
      icon: Clock,
      title: t("whyChoose.features.time.title"),
      description: t("whyChoose.features.time.description"),
    },
    {
      icon: Star,
      title: t("whyChoose.features.mechanics.title"),
      description: t("whyChoose.features.mechanics.description"),
    },
    {
      icon: CheckCircle2,
      title: t("whyChoose.features.pricing.title"),
      description: t("whyChoose.features.pricing.description"),
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("whyChoose.title")}{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("whyChoose.companyName")}
            </span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            {t("whyChoose.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChoose
