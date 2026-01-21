"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Check, Plus, Home, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock address interface - replace with actual API interface later
interface Address {
  id: string
  label: string
  type: "home" | "work" | "other"
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

type Props = {
  selectedAddress: string | null
  onSelectAddress: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

// Mock data - replace with API call later
const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    type: "home",
    street: "123 Main Street, Apt 4B",
    city: "Riyadh",
    state: "Riyadh Province",
    postalCode: "12345",
    country: "Saudi Arabia",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    type: "work",
    street: "456 Business Ave, Floor 10",
    city: "Jeddah",
    state: "Makkah Province",
    postalCode: "23456",
    country: "Saudi Arabia",
    isDefault: false,
  },
  {
    id: "addr-3",
    label: "Parents House",
    type: "other",
    street: "789 Family Road",
    city: "Dammam",
    state: "Eastern Province",
    postalCode: "34567",
    country: "Saudi Arabia",
    isDefault: false,
  },
]

export default function AddressStep({
  selectedAddress,
  onSelectAddress,
  onBack,
  onContinue,
}: Props) {
  const [addresses] = useState<Address[]>(mockAddresses)

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home
      case "work":
        return Briefcase
      default:
        return MapPin
    }
  }

  return (
    <Card className="bg-card border-border shadow-card">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Select Service Location</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose where you'd like the service to be performed
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => {
              const Icon = getAddressIcon(address.type)
              const isSelected = selectedAddress === address.id

              return (
                <Card
                  key={address.id}
                  className={cn(
                    "group cursor-pointer transition-all hover:border-primary/50 relative",
                    isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border"
                  )}
                  onClick={() => onSelectAddress(address.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{address.label}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state}
                      </p>
                      <p>
                        {address.postalCode}, {address.country}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {addresses.length === 0 && (
            <div className="py-12 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No addresses found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first address to continue with the booking
              </p>
              <Button variant="default" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Address
              </Button>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onContinue} disabled={!selectedAddress}>
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
