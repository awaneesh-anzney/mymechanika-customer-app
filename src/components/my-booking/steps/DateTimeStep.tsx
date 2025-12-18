"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Clock } from "lucide-react"
import { timeSlots } from "../constants"

type Props = {
  selectedDate: Date | undefined
  onSelectDate: (date?: Date) => void
  selectedTime: string
  onSelectTime: (time: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function DateTimeStep({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onBack,
  onContinue,
}: Props) {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Select Date & Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-3 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              className="rounded-xl border border-border"
              disabled={(date) => date < new Date()}
            />
          </div>
          <div>
            <Label className="mb-3 block">Select Time</Label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-12"
                  onClick={() => onSelectTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={!selectedDate || !selectedTime}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

