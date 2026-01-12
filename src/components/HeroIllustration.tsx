"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useServiceCategories } from "@/hooks/useServices";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroIllustration() {
  const { t } = useTranslation('services');
  const router = useRouter();
  const { data: categories, isLoading, error } = useServiceCategories();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/services?category=${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center lg:justify-end">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-[140px] rounded-xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Only take first 6 or 9 to fit the grid nicely if needed, or all of them.
  // The original design had a fixed grid.
  const allCategories = categories || [];
  const MAX_ITEMS = 9;
  const shouldShowMore = allCategories.length > MAX_ITEMS;
  const displayCategories = shouldShowMore ? allCategories.slice(0, MAX_ITEMS - 1) : allCategories;

  return (
    <div className="w-full flex justify-center lg:justify-end">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {displayCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="group relative h-[140px] flex flex-col p-4 rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 cursor-pointer overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-6 h-6 object-contain" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">
                  <span>{t('heroIllustration.viewServices', 'View Services')}</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {shouldShowMore && (
          <div
            onClick={() => router.push('/services')}
            className="group relative h-[140px] flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-primary/10 cursor-pointer"
          >
            <div className="p-3 mb-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="font-bold text-primary text-sm">
              {t('heroIllustration.showMore', 'Show More')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
