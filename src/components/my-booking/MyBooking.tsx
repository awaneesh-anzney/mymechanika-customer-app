"use client"
import { useState } from "react"
import { ProgressSteps } from "./ProgressSteps"
import VehicleServiceStep from "./steps/VehicleServiceStep"
import ServicesStep from "./steps/ServicesStep"
import WorkshopStep from "./steps/WorkshopStep"
import DateTimeStep from "./steps/DateTimeStep"
import ConfirmStep from "./steps/ConfirmStep"
import { toast } from "sonner"

export default function MyBooking() {
  const [step, setStep] = useState(1)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleConfirm = () => {
    toast.success("Your booking is confirmed")
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ProgressSteps step={step} />

      {step === 1 && (
        <VehicleServiceStep
          selectedVehicle={selectedVehicle}
          onSelectVehicle={(id) => setSelectedVehicle(id)}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ServicesStep
          selectedServices={selectedServices}
          onToggleService={toggleService}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <WorkshopStep
          selectedWorkshop={selectedWorkshop}
          onSelectWorkshop={(id) => setSelectedWorkshop(id)}
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <DateTimeStep
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onBack={() => setStep(3)}
          onContinue={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <ConfirmStep
          selectedVehicle={selectedVehicle}
          selectedServices={selectedServices}
          selectedWorkshop={selectedWorkshop}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBack={() => setStep(4)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
