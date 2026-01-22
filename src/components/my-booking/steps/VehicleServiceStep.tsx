"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Car, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMyVehicles } from "@/hooks/useVehicles"
import { Badge } from "@/components/ui/badge"

type Props = {
  selectedVehicle: string | null
  onSelectVehicle: (id: string) => void
  onContinue: () => void
}

export default function VehicleServiceStep({
  selectedVehicle,
  onSelectVehicle,
  onContinue,
}: Props) {
  const { data: vehicles, isLoading } = useMyVehicles()

  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Select Vehicle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Vehicle</Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {isLoading ? (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                Loading vehicles...
              </div>
            ) : vehicles?.length === 0 ? (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No vehicles found. Please add a vehicle first.
              </div>
            ) : (
              vehicles?.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVehicle(v.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedVehicle === v.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={v.carImage || "https://placehold.co/100x70?text=Car"} // Fallback image
                      alt={`${v.brand.name} ${v.model.name}`}
                      className="w-20 h-14 rounded-md object-cover border"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">
                          {v.brand.name} {v.model.name} {v.year}
                        </p>
                        {selectedVehicle === v.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{v.registrationNumber}</Badge>
                        <Badge>{v.fuelType}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>



        <div className="flex justify-end">
          <Button onClick={onContinue} disabled={!selectedVehicle}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
