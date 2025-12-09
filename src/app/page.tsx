import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HeroIllustration } from "@/components/HeroIllustration";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="flex flex-col justify-center">
              <HeroSection />
            </div>

            {/* Right Section - Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
