"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Car, Wrench, MapPin, CalendarCheck2, Home } from "lucide-react"
import { workshops } from "../constants"
import { useMyVehicles } from "@/hooks/useVehicles"
import { useState, useEffect } from "react"
import { getServiceCategories, getServices, ServiceCategory } from "@/services/services.service"
import { useAddresses } from "@/hooks/useAddress"

type Props = {
  selectedVehicle: string | null
  selectedServices: string[]
  selectedAddress: string | null
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
  selectedAddress,
  selectedWorkshop,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
}: Props) {
  const { data: vehicles } = useMyVehicles()
  const { data: addresses = [] } = useAddresses()
  const [servicesData, setServicesData] = useState<any[]>([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  
  // Fetch all services to display selected ones
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setIsLoadingServices(true)
        // First get categories
        const categoriesResponse = await getServiceCategories()
        const categories = categoriesResponse.data
        
        // Then fetch services from all categories
        const allServicesPromises = categories.map((cat: ServiceCategory) => 
          getServices(cat.id)
        )
        const servicesResponses = await Promise.all(allServicesPromises)
        
        // Flatten all services into one array
        const allServices = servicesResponses.flatMap(response => response.data)
        setServicesData(allServices)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoadingServices(false)
      }
    }
    
    fetchAllServices()
  }, [])
  
  const selectedVeh = vehicles?.find((v) => v.id === selectedVehicle)
  const vehicleLabel = selectedVeh ? `${selectedVeh.brand.name} ${selectedVeh.model.name} ${selectedVeh.year} (${selectedVeh.registrationNumber})` : ""
  
  // Find selected address from API data
  const selectedAddr = addresses.find((a) => a.id === selectedAddress)
  const addressLabel = selectedAddr 
    ? (
        selectedAddr.city 
          ? `${selectedAddr.houseNo}, ${selectedAddr.street}, ${selectedAddr.city.name}, ${selectedAddr.city.state}` 
          : `${selectedAddr.houseNo}, ${selectedAddr.street}`
      )
    : ""
  
  // Find selected services from API data
  const selectedServiceObjects = selectedServices
    .map((id) => servicesData.find((s) => s.id === id))
    .filter(Boolean)
  
  const serviceNames = selectedServiceObjects
    .map(s => s?.name)
    .filter(Boolean)
    .join(", ")
  
  const workshopName = workshops.find((w) => w.id === selectedWorkshop)?.name ?? ""
  
  const total = selectedServiceObjects
    .reduce((sum, s) => sum + (Number(s?.price) || 0), 0)
  
  const currency = selectedServiceObjects[0]?.currency || "SAR"

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
              <Home className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Service Location</span>
            </div>
            <span className="font-medium text-foreground text-right text-sm">{addressLabel || "—"}</span>
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
            <span className="font-bold text-xl text-primary">{currency} {total.toFixed(2)}</span>
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
