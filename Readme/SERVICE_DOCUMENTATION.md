# Service Module Documentation

This document provides a comprehensive overview of the **Services** module within the MyMechanika Customer App. It details the required data structures, keywords, API requirements, and data formats used to manage car care services, workshops, and bookings.

## 1. Overview
The Service module is responsible for:
- Displaying a list of available car care services.
- Facilitating the booking flow (Vehicle -> Service -> Workshop -> Date/Time).
- Displaying service history and records for the customer.

---

## 2. Data Structures (Keywords & Types)

### A. Service Object
Represents an individual service offered (e.g., Oil Change, Brake Inspection).

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the service (e.g., `"oil-change"`) |
| `name` | `string` | The display name of the service |
| `price` | `number` | The cost of the service |
| `duration` | `string` | Estimated time to complete (e.g., `"30 min"`) |
| `description` | `string` | (Optional) Detailed explanation of what the service includes |
| `image` | `string` | (Optional) URL for the service icon or image |

### B. Workshop Object
Represents a service provider or garage.

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `number/string` | Unique identifier for the workshop |
| `name` | `string` | Name of the workshop |
| `rating` | `number` | Average customer rating (0-5) |
| `reviews` | `number` | Total number of reviews |
| `distance` | `string` | Distance from the user's location (e.g., `"2.3 km"`) |

### C. Vehicle Object
Represents a customer's vehicle.

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier for the vehicle |
| `make` | `string` | Manufacturer (e.g., "Toyota") |
| `model` | `string` | Model name (e.g., "Camry") |
| `year` | `number` | Manufacturing year |
| `plate` | `string` | License plate number |
| `fuelType` | `string` | Type of fuel (Petrol, Diesel, CNG, Electric) |
| `image` | `string` | URL for the vehicle thumbnail |

---

## 3. API Requirements

To make the service module fully dynamic, the following API endpoints are required:

### 1. Get All Services
- **Endpoint**: `GET /v1/services`
- **Purpose**: Fetch the list of available services to display on the services page and during the booking flow.
- **Response Format**: List of `Service` objects.

### 2. Get Available Workshops
- **Endpoint**: `GET /v1/workshops`
- **Purpose**: Fetch workshops, optionally filtered by location or service compatibility.
- **Response Format**: List of `Workshop` objects.

### 3. Create a Booking
- **Endpoint**: `POST /v1/bookings`
- **Purpose**: Submit a new service booking request.
- **Payload**:
  ```json
  {
    "vehicle_id": "toyota-camry-123",
    "service_ids": ["oil-change", "brake-inspection"],
    "workshop_id": 1,
    "booking_date": "2024-12-25",
    "booking_time": "10:00 AM"
  }
  ```

### 4. Get Service History
- **Endpoint**: `GET /v1/customers/me/service-history`
- **Purpose**: Retrieve historical service records for the logged-in user.
- **Response Format**: List of service record objects, including status (Completed, Pending, etc.).

---

## 4. Vehicle Management Flow

### A. Add Vehicle Flow (Wizard)
The "Add Vehicle" process is a multi-step wizard:

1.  **Step 1: Select Brand**: User picks a manufacturer (e.g., Toyota, Honda).
2.  **Step 2: Select Model**: User picks a model based on the brand (e.g., Fortuner, City).
3.  **Step 3: Select Fuel Type**: User picks variant (Petrol, Diesel, CNG, Electric, Hybrid).
4.  **Step 4: Enter Details**: User enters:
    - `year`: Manufacturing year.
    - `color`: Vehicle color.
    - `number`: License plate / registration number (e.g., "KA 01 AB 1234").
    - `km`: Current odometer reading.

### B. Select Vehicle Flow (Booking)
1.  **Fetch Vehicles**: Call `GET /v1/customers/me/vehicles`.
2.  **Display**: Show a list of owned vehicles.
3.  **Selection**: User selects one to associate with the current booking.

---

## 5. Vehicle API Requirements

### 1. Get Brands & Models
- **Endpoint**: `GET /v1/vehicles/meta`
- **Purpose**: Provide data for the brand and model selection steps.

### 2. Add New Vehicle
- **Endpoint**: `POST /v1/customers/me/vehicles`
- **Payload**:
  ```json
  {
    "brand_id": "toyota",
    "model": "Fortuner",
    "fuel_type": "diesel",
    "year": "2022",
    "number": "KA 01 AB 1234",
    "current_km": 15400,
    "color": "White"
  }
  ```

### 3. Get User's Vehicles
- **Endpoint**: `GET /v1/customers/me/vehicles`
- **Purpose**: Fetch all vehicles owned by the logged-in user.


---

## 6. Example Data Format (JSON)

### Add Vehicle Payload Sample
```json
{
  "brand_id": "honda",
  "model": "City",
  "fuel_type": "petrol",
  "year": "2021",
  "number": "MH 02 XZ 9999",
  "current_km": 28150,
  "color": "Silver"
}
```


### Service Data Sample
```json
[
  {
    "id": "oil-change",
    "name": "Oil Change",
    "price": 49,
    "duration": "30 min",
    "description": "Premium engine oil replacement including filter check."
  },
  {
    "id": "full-service",
    "name": "Full Service",
    "price": 199,
    "duration": "2-3 hrs",
    "description": "Comprehensive bumper-to-bumper vehicle inspection and maintenance."
  }
]
```

### Booking Request Sample
```json
{
  "vehicleId": "honda-civic-xyz",
  "services": [
    "brake-inspection",
    "tire-rotation"
  ],
  "workshopId": 2,
  "appointment": {
    "date": "2024-11-20T10:00:00Z",
    "slot": "10:00 AM"
  }
}
```

---

## 7. Localization (i18next)
The service titles and descriptions are managed via translation files.
- **Path**: `src/i18n/locales/[lang]/services.json`
- **Keyword IDs**: Use the `id` of the service as the key in the JSON for consistent mapping.
  - Example: `items.oil-change.title`

---

## 8. Current Implementation Keywords
The following IDs are currently hardcoded in the frontend and should be matched in the backend:
- **Service IDs**: `oil-change`, `brake-inspection`, `full-service`, `tire-rotation`, `engine-diagnostic`, `ac-service`.
- **Vehicle Fuel Types**: `petrol`, `diesel`, `cng`, `electric`, `hybrid`.
- **Status Types**: `Completed`, `Scheduled`, `Pending`, `Cancelled`.

