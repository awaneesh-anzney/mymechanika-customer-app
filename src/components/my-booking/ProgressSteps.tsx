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
    <div className="flex items-center justify-center overflow-x-auto pb-2 px-4">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                  step >= s.num ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s.num ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground text-center whitespace-nowrap">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-6 sm:w-8 md:w-12 h-1 mx-1.5 sm:mx-2 rounded-full transition-colors flex-shrink-0",
                  step > s.num ? "bg-primary" : "bg-secondary"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
