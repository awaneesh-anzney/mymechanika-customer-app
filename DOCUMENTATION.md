# MyMechanika Customer App Documentation

This document provides a comprehensive overview of the MyMechanika Customer Application, including page descriptions, required APIs, and the database structure.

## 📱 Application Pages

### Public Pages
1. **Home Page (`/`)**
   - **Description**: The landing page featuring a hero section, service highlights, "How It Works" guide, "Why Choose Us" statistics, and app download links.
   - **State**: Responsive with Dark/Light mode support and RTL (Arabic) support.

2. **Services Page (`/services`)**
   - **Description**: Displays a list of available car services (Oil Change, Brakes, AC Repair, etc.) with prices, ratings, and durations.
   - **Features**: Featured services are highlighted. Includes a "Book Now" action for each service.

3. **About Page (`/about`)**
   - **Description**: Information about MyMechanika, its mission, and team.

4. **Contact Page (`/contact`)**
   - **Description**: Contact information and a form for customer inquiries.

### Authentication Pages
1. **Auth Page (`/auth`)**
   - **Description**: Unified page for Login and Registration.
   - **Fields**: 
     - *Login*: Email, Password.
     - *Registration*: Full Name, Email, Phone Number, Password.
   - **Features**: Password visibility toggle, Google OAuth placeholder, and language-aware validation.

### Protected Pages (User Dashboard)
1. **Dashboard (`/dashboard`)**
   - **Description**: At-a-glance summary for the user.
   - **Sections**:
     - Quick Stats: Total Vehicles, Bookings, Upcoming Services, Loyalty Points, Services Due, Savings.
     - Upcoming Services: List of future appointments with "Track" functionality.
     - My Vehicles: Compact view of the user's garage with a "Book Service" shortcut.
     - Recent Activity: Timeline of recent services and payments.

2. **My Vehicles (`/my-vehicles`)**
   - **Description**: Complete garage management.
   - **Features**:
     - Vehicle List: Card view showing image, plate number, fuel type, and service status.
     - Add Vehicle Wizard: A multi-step process to register a vehicle (Brand -> Model -> Fuel Type -> Details like Year, Color, Number, Odometer).

3. **Service History (`/service-history`)**
   - **Description**: Detailed log of all past services.
   - **Features**:
     - Global search and filtering by vehicle or time period.
     - Service records showing provider, price, and status.
     - Invoice viewing and downloading.

4. **My Profile (`/my-profile`)**
   - **Description**: User account management.
   - **Details**: Full Name, Email, Phone, Address, Postal Code.
   - **Extras**: Loyalty membership status (e.g., Gold Member) and notification preferences.

---

## 🏗️ Database Structure (PostgreSQL)

The following schema is designed to support the functionality observed in the frontend application.

### 1. `users`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier |
| `full_name` | VARCHAR | User's full name |
| `email` | VARCHAR (Unique) | Login email |
| `phone` | VARCHAR | Contact number |
| `password_hash` | TEXT | Encrypted password |
| `address` | TEXT | Physical address |
| `postal_code` | VARCHAR | ZIP/Postal code |
| `loyalty_points` | INTEGER | Points for the reward system |
| `created_at` | TIMESTAMP | Record creation time |

### 2. `vehicles`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier |
| `user_id` | UUID (FK) | Reference to `users.id` |
| `brand` | VARCHAR | e.g., Toyota, BMW |
| `model` | VARCHAR | e.g., Camry, X5 |
| `fuel_type` | VARCHAR | Petrol, Diesel, Electric, etc. |
| `year` | INTEGER | Manufacturing year |
| `plate_number` | VARCHAR | Vehicle registration number |
| `odometer` | INTEGER | Current mileage |
| `color` | VARCHAR | Vehicle color |
| `image_url` | TEXT | Reference to vehicle image |

### 3. `services`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier |
| `name_en` | VARCHAR | Service name (English) |
| `name_ar` | VARCHAR | Service name (Arabic) |
| `base_price` | DECIMAL | Starting price |
| `duration_est` | VARCHAR | Estimated time (e.g., "2h") |
| `category` | VARCHAR | Mechanical, Electrical, etc. |
| `is_featured` | BOOLEAN | Highlight on frontend |

### 4. `bookings`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier |
| `user_id` | UUID (FK) | Reference to `users.id` |
| `vehicle_id` | UUID (FK) | Reference to `vehicles.id` |
| `service_id` | UUID (FK) | Reference to `services.id` |
| `scheduled_at` | TIMESTAMP | Appointment date and time |
| `status` | ENUM | Pending, Confirmed, In Progress, Completed, Cancelled |
| `total_price` | DECIMAL | Final amount charged |

### 5. `service_records`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier |
| `booking_id` | UUID (FK) | Reference to `bookings.id` |
| `provider_name` | VARCHAR | Service center name |
| `invoice_id` | VARCHAR | Generated invoice reference |
| `notes` | TEXT | Mechanics' comments |

---

## 🔗 Required APIs

### Authentication & User
- `POST /api/auth/register`: Create a new customer account.
- `POST /api/auth/login`: Authenticate and return session/token.
- `GET /api/user/profile`: Fetch current user details and loyalty status.
- `PATCH /api/user/profile`: Update personal information or preferences.

### Vehicle Management
- `GET /api/vehicles`: Retrieve all vehicles in the user's garage.
- `POST /api/vehicles`: Add a new vehicle.
- `PATCH /api/vehicles/:id`: Update vehicle details (e.g., odometer).
- `DELETE /api/vehicles/:id`: Remove a vehicle from the account.

### Services & Bookings
- `GET /api/services`: Fetch the list of available services for the marketplace.
- `GET /api/bookings`: Fetch user's appointment history and upcoming tasks.
- `POST /api/bookings`: Create a new service appointment.
- `PATCH /api/bookings/:id`: Update or cancel a booking.

### Data & Insights
- `GET /api/dashboard/stats`: Aggregated data for dashboard cards (Total spending, savings, points).
- `GET /api/service-history`: Detailed service logs with search/filter capabilities.
- `GET /api/invoices/:id`: Fetch or download PDF invoice for a specific service.
