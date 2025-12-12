import { Check } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
      <Check className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-primary">
        Trusted by 2M+ Car Owners
      </span>
    </div>
  );
}


