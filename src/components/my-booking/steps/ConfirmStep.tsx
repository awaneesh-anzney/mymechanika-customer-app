"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { services, workshops, vehicles } from "../constants"

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
  const selectedVeh = vehicles.find((v) => v.id === selectedVehicle)
  const vehicleLabel = selectedVeh ? `${selectedVeh.make} ${selectedVeh.model} ${selectedVeh.year} (${selectedVeh.plate})` : ""
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
        <div className="p-4 bg-secondary rounded-xl space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-medium text-foreground">{vehicleLabel || "—"}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Services</span>
            <span className="font-medium text-foreground">{serviceNames || "—"}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Workshop</span>
            <span className="font-medium text-foreground">{workshopName || "—"}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium text-foreground">
              {selectedDate ? selectedDate.toLocaleDateString() : "—"} {selectedTime ? `at ${selectedTime}` : ""}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Estimated Total</span>
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
