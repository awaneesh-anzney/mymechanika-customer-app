"use client"
import React from 'react'
import { Car, Calendar, Truck, Wrench, CheckCircle2, ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation('home');

  const steps = [
    {
      icon: Car,
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
      step: 1,
    },
    {
      icon: Calendar,
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
      step: 2,
    },
    {
      icon: Truck,
      title: t("howItWorks.steps.step3.title"),
      description: t("howItWorks.steps.step3.description"),
      step: 3,
    },
    {
      icon: Wrench,
      title: t("howItWorks.steps.step4.title"),
      description: t("howItWorks.steps.step4.description"),
      step: 4,
    },
    {
      icon: CheckCircle2,
      title: t("howItWorks.steps.step5.title"),
      description: t("howItWorks.steps.step5.description"),
      step: 5,
    },
  ];

  return (
    <section className="w-full bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            {t("howItWorks.badge")}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-linear-to-r from-primary/10 via-primary/50 to-primary/10 lg:block -z-10" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step Number & Icon */}
                <div className="relative z-10 mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-2 border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary group-hover:shadow-md">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground shadow-sm whitespace-nowrap">
                    {t("howItWorks.stepLabel")} {step.step}
                  </span>
                  <step.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Desktop Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 -translate-y-1/2 transform text-primary/40 z-0">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow - Mobile/Tablet only */}
                {index < steps.length - 1 && (
                  <div className="my-4 flex justify-center lg:hidden w-full">
                    <ArrowDown className="h-6 w-6 text-muted-foreground/30 animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
