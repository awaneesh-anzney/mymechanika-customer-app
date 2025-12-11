import { Car } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Car className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">MyMechanika</span>
    </div>
  );
}
