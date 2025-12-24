import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TrustBadge() {
  const { t } = useTranslation('home');
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
      <Check className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-primary">
        {t("hero.trustBadge")}
      </span>
    </div>
  );
}


