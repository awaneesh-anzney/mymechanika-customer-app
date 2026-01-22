"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Check, Plus, Home, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAddresses } from "@/hooks/useAddress"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  selectedAddress: string | null
  onSelectAddress: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function AddressStep({
  selectedAddress,
  onSelectAddress,
  onBack,
  onContinue,
}: Props) {
  // Fetch addresses from API
  const { data: addresses = [], isLoading } = useAddresses();

  const getAddressIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return Home
      case "office":
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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))
            ) : addresses.length > 0 ? (
              addresses.map((address) => {
                const Icon = getAddressIcon(address.label)
                const isSelected = selectedAddress === address.id
                const cityName = address.city ? `${address.city.name}, ${address.city.state}` : ""

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
                            <h3 className="font-semibold text-foreground capitalize">{address.label}</h3>
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
                        <p>{address.houseNo}, {address.street}</p>
                        {address.landmark && <p>{address.landmark}</p>}
                        <p>{cityName}</p>
                        <p>{address.pincode}, {address.country || 'Saudi Arabia'}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : null}
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
