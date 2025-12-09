# MyMechanika Customer App

A modern, responsive customer-facing web application for MyMechanika, built with Next.js 15, Tailwind CSS, and Shadcn UI. This application allows users to find car services, book appointments, and manage their vehicle maintenance needs.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Poppins](https://fonts.google.com/specimen/Poppins) (via `next/font/google`)
- **Containerization:** Docker

## ✨ Features

- **Modern UI/UX:** Clean, professional interface with consistent branding (Green `#89BD2C` & Blue `#0F52BA`).
- **Service Booking:** Browse and book various car maintenance services.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **Interactive Elements:** Image sliders, hover effects, and smooth transitions.
- **Global Theming:** Consistent design tokens for colors, typography, and spacing.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mymechanika-customer-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🐳 Docker

1. **Build the Docker image:**
   ```bash
   docker build -t mymechanika-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 mymechanika-app
   ```

## 📂 Project Structure

```plaintext
mymechanika-customer-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (public)/        # Public routes (e.g., /services)
│   │   ├── globals.css      # Global styles & Tailwind theme
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── assets/              # Static assets (images)
│   ├── components/          # React components
│   │   ├── footer/          # Footer components
│   │   ├── locations/       # Location related components
│   │   ├── services/        # Service card & listing components
│   │   ├── ui/              # Reusable UI components (Shadcn)
│   │   ├── HeroSection.tsx  # Landing page hero
│   │   ├── Navbar.tsx       # Main navigation
│   │   └── ...
│   └── lib/                 # Utilities (cn helper, etc.)
├── public/                  # Static files served from root
├── dockerfile               # Multi-stage Docker build
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies & scripts
```

## 🎨 Color Palette

The application uses a defined color scheme available as CSS variables:

- **Primary:** `#89BD2C` (Green)
- **Secondary:** `#0F52BA` (Blue)
- **Background:** `#FFFFFF` (White)
- **Foreground:** `#222222` (Dark Gray)

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code quality issues.
