
import { HeroSection } from "@/components/HeroSection";
import { HeroIllustration } from "@/components/HeroIllustration";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">      
       <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
           {/* Left Hero Section */}
           <div className="w-full lg:w-1/2">
             <HeroSection />
           </div>
           {/* Right Hero Illustration */}
           <div className="w-full lg:w-1/2 flex justify-center">
             <HeroIllustration />
           </div>
       </div>
       {/* Footer */}
       <div className="mt-12 lg:mt-24">
         <Footer />
       </div>
    </div>
  );
}
