"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Wrench, Star, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { workshops } from "../constants"

type Props = {
  selectedWorkshop: number | null
  onSelectWorkshop: (id: number) => void
  onBack: () => void
  onContinue: () => void
}

export default function WorkshopStep({
  selectedWorkshop,
  onSelectWorkshop,
  onBack,
  onContinue,
}: Props) {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Choose a Workshop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            onClick={() => onSelectWorkshop(workshop.id)}
            className={cn(
              "p-4 rounded-xl border-2 cursor-pointer transition-all",
              selectedWorkshop === workshop.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{workshop.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{workshop.rating}</span>
                      <span>({workshop.reviews})</span>
                    </div>
                    <span>•</span>
                    <span>{workshop.distance}</span>
                  </div>
                </div>
              </div>
              {selectedWorkshop === workshop.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={!selectedWorkshop}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

