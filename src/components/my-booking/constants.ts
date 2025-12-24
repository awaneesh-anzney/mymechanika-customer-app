import type { Service, Workshop, Vehicle } from "./types"

export const services: Service[] = [
  { id: "oil-change", name: "Oil Change", price: 49, duration: "30 min" },
  { id: "brake-inspection", name: "Brake Inspection", price: 29, duration: "45 min" },
  { id: "full-service", name: "Full Service", price: 199, duration: "2-3 hrs" },
  { id: "tire-rotation", name: "Tire Rotation", price: 39, duration: "30 min" },
  { id: "engine-diagnostic", name: "Engine Diagnostic", price: 79, duration: "1 hr" },
  { id: "ac-service", name: "AC Service", price: 89, duration: "1 hr" },
]

export const workshops: Workshop[] = [
  { id: 1, name: "AutoCare Plus", rating: 4.8, reviews: 234, distance: "2.3 km" },
  { id: 2, name: "QuickFix Garage", rating: 4.6, reviews: 189, distance: "3.1 km" },
  { id: 3, name: "Elite Motors", rating: 4.9, reviews: 312, distance: "4.5 km" },
]

export const timeSlots: string[] = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
]

export const vehicles: Vehicle[] = [
  {
    id: "toyota",
    label: "Toyota Camry 2021 (ABC 1234)",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    plate: "ABC 1234",
    fuelType: "Petrol",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "honda",
    label: "Honda Civic 2020 (XYZ 5678)",
    make: "Honda",
    model: "Civic",
    year: 2020,
    plate: "XYZ 5678",
    fuelType: "CNG",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "ford",
    label: "Ford Focus 2019 (DEF 9012)",
    make: "Ford",
    model: "Focus",
    year: 2019,
    plate: "DEF 9012",
    fuelType: "Diesel",
    image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=500&q=80",
  },
]
