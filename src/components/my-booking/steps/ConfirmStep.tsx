"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Car, Wrench, MapPin, CalendarCheck2 } from "lucide-react"
import { services, workshops } from "../constants"
import { useMyVehicles } from "@/hooks/useVehicles"

type Props = {
  selectedVehicle: string | null
  selectedServices: string[]
  selectedWorkshop: number | null
  selectedDate: Date | undefined
  selectedTime: string
  onBack: () => void
  onConfirm: () => void
}

function formatCurrency(value: number) {
  return `$${value}`
}

export default function ConfirmStep({
  selectedVehicle,
  selectedServices,
  selectedWorkshop,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
}: Props) {
  const { data: vehicles } = useMyVehicles()
  const selectedVeh = vehicles?.find((v) => v.id === selectedVehicle)
  const vehicleLabel = selectedVeh ? `${selectedVeh.brand.name} ${selectedVeh.model.name} ${selectedVeh.year} (${selectedVeh.registrationNumber})` : ""
  const serviceNames = selectedServices
    .map((id) => services.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(", ")
  const workshopName = workshops.find((w) => w.id === selectedWorkshop)?.name ?? ""
  const total = selectedServices
    .map((id) => services.find((s) => s.id === id)?.price ?? 0)
    .reduce((sum, p) => sum + p, 0)

  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" />
          Confirm Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Vehicle</span>
            </div>
            <span className="font-medium text-foreground">{vehicleLabel || "—"}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Services</span>
            </div>
            <span className="font-medium text-foreground">{serviceNames || "—"}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Workshop</span>
            </div>
            <span className="font-medium text-foreground">{workshopName || "—"}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date & Time</span>
            </div>
            <span className="font-medium text-foreground">
              {selectedDate ? selectedDate.toLocaleDateString() : "—"} {selectedTime ? `at ${selectedTime}` : ""}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-primary/10 p-4">
            <span className="text-sm text-muted-foreground">Estimated Total</span>
            <span className="font-bold text-xl text-primary">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="default" size="lg" onClick={onConfirm}>
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
