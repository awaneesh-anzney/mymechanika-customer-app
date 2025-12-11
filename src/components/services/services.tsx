import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star, Clock  } from "lucide-react";
import { Car, Wrench, User } from "lucide-react"; 


interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  duration: string;
  icon: LucideIcon;
  featured?: boolean;
}

const ServiceCard = ({
  title,
  description,
  price,
  originalPrice,
  rating,
  duration,
  icon: Icon,
  featured = false,
}: ServiceCardProps) => {
  return (
    <div
      className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${
        featured
          ? "bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30"
          : "bg-card border border-border hover:border-primary/30"
      } shadow-soft hover:shadow-lg`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold bg-linear-to-br from-primary to-secondary text-primary-foreground rounded-full shadow-md z-10">
          Popular
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
            featured
              ? "bg-linear-to-br from-primary to-secondary"
              : "bg-primary/10 group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-secondary"
          }`}
        >
          <Icon
            className={`w-7 h-7 ${
              featured
                ? "text-primary-foreground"
                : "text-primary group-hover:text-primary-foreground"
            } transition-colors`}
          />
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="font-medium text-foreground">{rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>
        <Button variant={featured ? "default" : "default"} size="sm">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
