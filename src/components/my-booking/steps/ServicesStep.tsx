"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Clock, Check, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "../constants"

type Props = {
  selectedServices: string[]
  onToggleService: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function ServicesStep({
  selectedServices,
  onToggleService,
  onBack,
  onContinue,
}: Props) {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          Select Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Services</Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => onToggleService(service.id)}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all",
                  selectedServices.includes(service.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{service.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">${service.price}</span>
                    {selectedServices.includes(service.id) && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={selectedServices.length === 0}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

