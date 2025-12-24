import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Crosshair, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface LocationSearchProps {
  className?: string;
  onSearch?: (location: string) => void;
}

const LocationSearch = ({ className, onSearch }: LocationSearchProps) => {
  const { t } = useTranslation('home');
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDetectLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode here
          setLocation("Current Location");
          setIsLoading(false);
          toast.success(t("hero.locationMessages.success"));
        },
        (error) => {
          setIsLoading(false);
          toast.error(t("hero.locationMessages.error"));
        }
      );
    } else {
      setIsLoading(false);
      toast.error(t("hero.locationMessages.unsupported"));
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-secondary/50 rounded-full blur-sm opacity-20 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative flex items-center bg-background rounded-full p-1.5 border border-border shadow-sm hover:shadow-md transition-all duration-300">
          <div className="pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="flex-1 bg-transparent border-none h-11 px-3 text-sm focus:outline-none placeholder:text-muted-foreground text-foreground"
            placeholder={t("hero.locationPlaceholder")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="flex items-center gap-1 pr-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={handleDetectLocation}
              disabled={isLoading}
              title={t("hero.detectLocation")}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              className="rounded-full px-5 h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              onClick={() => onSearch?.(location)}
            >
              <Search className="h-4 w-4 mr-2" />
              {t("hero.findButton")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
