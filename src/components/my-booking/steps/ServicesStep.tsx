"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clock, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"
// Import hooks and types
import { useServiceCategories, useServices } from "@/hooks/useServices"
import { ServiceCategory } from "@/services/services.service"

type Props = {
  selectedServices: string[]
  onToggleService: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function ServicesStep({
  selectedServices,
  onToggleService,
  onBack,
  onContinue,
}: Props) {
  // 1. Fetch Categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useServiceCategories();
  const categories = categoriesData || [];

  // 2. State for active category
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  // 3. Fetch Services based on category
  const { data: servicesData, isLoading: isLoadingServices } = useServices(activeCategoryId || undefined);
  const services = servicesData || [];

  return (
    <div className="flex flex-col gap-6 items-start h-[calc(100vh-220px)]">
      {/* Categories & Services */}
      <div className="flex-1 w-full h-full flex flex-col gap-4 overflow-hidden">

        {/* Categories Header */}
        <div className="shrink-0 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Select Services</h2>
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex w-max space-x-2">
              {categories.map((category: ServiceCategory) => (
                <Button
                  key={category.id}
                  variant={activeCategoryId === category.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Services Grid (Scrollable) */}
        <div className="flex-1 min-h-0 relative">
          <ScrollArea className="h-full pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {isLoadingServices ? (
                // Skeleton loading state
                Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="h-40 animate-pulse bg-muted/50 border-0" />
                ))
              ) : services.length > 0 ? (
                services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <Card
                      key={service.id}
                      className={cn(
                        "group cursor-pointer transition-all hover:border-primary/50 relative overflow-hidden flex flex-col",
                        isSelected ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => onToggleService(service.id)}
                    >
                      <CardContent className="p-4 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium line-clamp-2 pr-6">{service.name}</h3>
                            {isSelected && (
                              <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-sm z-10">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration || 'N/A'}
                          </div>
                          <div className="font-semibold text-primary">
                            {service.currency} {service.price}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  No services found in this category.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Navigation Buttons */}
        <div className="shrink-0 flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={selectedServices.length === 0}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

