
import { HeroSection } from "@/components/HeroSection";
import { HeroIllustration } from "@/components/HeroIllustration";
import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/Navbar";
import  WhyChoose  from "@/components/WhyChoose";
import AppDownload from "@/components/appdownload/AppDownload";



export default function Home() {
  return (
    <div className="min-h-screen bg-background">  
            <Navbar />    
       <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-12 lg:py-20 gap-12 lg:gap-8">
           {/* Left Hero Section */}
           <div className="w-full lg:w-1/2">
             <HeroSection />
           </div>
           {/* Right Hero Illustration */}
           <div className="w-full lg:w-1/2 flex justify-center">
             <HeroIllustration />
           </div>
       </div>
       {/* Why Choose Us */}
       <div className="w-full">
         <WhyChoose />
       </div>
       {/* App Download */}
       <div className="w-full pt-5">
         <AppDownload />
       </div>
       {/* Footer */}
       <div className="mt-12 lg:mt-24">
         <Footer />
       </div>
    </div>
  );
}
