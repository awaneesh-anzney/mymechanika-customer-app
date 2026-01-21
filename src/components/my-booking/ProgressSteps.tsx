"use client"
import { Check, Car, Wrench, MapPin, CalendarCheck2, Home } from "lucide-react"
import { cn } from "@/lib/utils"

type ProgressStepsProps = {
  step: number
}

const steps = [
  { num: 1, label: "Vehicle", icon: Car },
  { num: 2, label: "Services", icon: Wrench },
  { num: 3, label: "Address", icon: Home },
  { num: 4, label: "Workshop", icon: MapPin },
  { num: 5, label: "Schedule", icon: CalendarCheck2 },
  { num: 6, label: "Confirm", icon: Check },
]

export function ProgressSteps({ step }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                step >= s.num ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}
            >
              {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
            </div>
            <span className="text-xs mt-2 text-muted-foreground hidden sm:block">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-16 sm:w-24 h-1 mx-2 rounded-full transition-colors",
                step > s.num ? "bg-primary" : "bg-secondary"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
