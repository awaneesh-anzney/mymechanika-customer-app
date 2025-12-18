"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car } from "lucide-react"
import { vehicles } from "../constants"

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
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Select Vehicle & Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Vehicle</Label>
          <Select value={selectedVehicle ?? ""} onValueChange={onSelectVehicle}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choose a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
