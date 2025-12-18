import { Car } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Car className="h-8 w-8 text-secondary" />
      <span className="text-2xl font-bold text-secondary">MyMechanika</span>
    </div>
  );
}
