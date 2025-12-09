import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ChevronDown } from "lucide-react";

const LocationSearch = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border border-border shadow-lg">
        {/* Location Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          <button className="flex items-center gap-1 text-primary text-sm font-medium hover:opacity-80 transition-opacity">
            Detect
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Search Button */}
        <Button variant="default" size="lg" className="sm:w-auto w-full">
          <Search className="w-4 h-4 mr-2" />
          Find Services
        </Button>
      </div>
    </div>
  );
};

export default LocationSearch;
