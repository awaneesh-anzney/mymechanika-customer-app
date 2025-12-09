import { Check } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#89BD2C]/10 rounded-full border border-[#89BD2C]/20">
      <Check className="h-4 w-4 text-[#89BD2C]" />
      <span className="text-sm font-medium text-[#89BD2C]">
        Trusted by 2M+ Car Owners
      </span>
    </div>
  );
}


