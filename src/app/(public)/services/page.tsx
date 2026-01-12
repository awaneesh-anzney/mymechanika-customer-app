"use client";
import React, { useState, useEffect } from 'react'
import ServiceCard from '@/components/services/services'
import { Wrench, LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useServiceCategories, useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const { t, i18n } = useTranslation('services');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Get Category from URL
  const categoryParam = searchParams.get('category');

  const { data: categories, isLoading: isCategoriesLoading } = useServiceCategories();

  // Create a derived state for the effective category ID.
  // Use URL param if available.
  // If not, and categories are loaded, use the first category.
  const selectedCategoryId = categoryParam || (categories && categories.length > 0 ? categories[0].id : undefined);

  const { data: services, isLoading: queryLoading } = useServices(selectedCategoryId);
  // We consider services loading if the query is loading OR if we are waiting for a category to be selected (which depends on categories loading)
  const isServicesLoading = queryLoading || (!selectedCategoryId && isCategoriesLoading);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync URL with default category if loaded and no param
  // Optional: If you want the URL to always reflect the state, uncomment below.
  // But for now, we just let derived state handle the "default" view without changing URL necessarily, 
  // or we can push the default to URL to make it explicit.
  useEffect(() => {
    if (!categoryParam && categories && categories.length > 0) {
      // We generally don't encourage auto-redirecting on mount as it adds history entries, 
      // but it makes the "current state" shareable.
      // For a better UX, we just render Category 1 but don't force the URL unless user interacts.
      // So we leave this empty or remove it.
    }
  }, [categoryParam, categories]);

  const activeT = mounted ? t : i18n.getFixedT('en', 'services');

  const visibleCategories = showAllCategories ? categories : categories?.slice(0, 10);

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

      <div className="mb-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x md:flex-wrap md:justify-center md:gap-6 md:overflow-visible">
          {isCategoriesLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-none w-24 flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-20 h-4" />
              </div>
            ))
          ) : (
            <>
              {visibleCategories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => router.push(`/services?category=${category.id}`, { scroll: false })}
                  className={cn(
                    "flex-none w-28 p-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 border-2 snap-center",
                    selectedCategoryId === category.id
                      ? "border-primary bg-primary/5 shadow-md scale-105"
                      : "border-transparent bg-card hover:bg-muted/50 hover:border-muted-foreground/20"
                  )}
                >
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-muted">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover p-2"
                      />
                    ) : (
                      <Wrench className="w-6 h-6 m-auto text-muted-foreground" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium text-center leading-tight line-clamp-2",
                    selectedCategoryId === category.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {category.name}
                  </span>
                </button>
              ))}

              {categories && categories.length > 10 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="flex-none w-28 p-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 border-2 border-transparent bg-card hover:bg-muted/50 hover:border-muted-foreground/20 snap-center"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted text-foreground/70">
                    {showAllCategories ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                  <span className="text-sm font-medium text-center leading-tight text-muted-foreground">
                    {showAllCategories ? activeT("viewLess") || "View Less" : activeT("viewMore") || "View More"}
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isServicesLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-6 space-y-4">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <div className="flex gap-2 pt-4">
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="flex-1 h-10" />
              </div>
            </div>
          ))
        ) : services && services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              {...service}
              title={service.name}
              price={service.formattedPrice || service.price}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 opacity-50">
            <p className="text-xl font-medium">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
