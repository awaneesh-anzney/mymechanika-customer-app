"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary underline underline-offset-4"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Moon className="h-5 w-5" />
            </Button>
            <Button
             variant="ghost" 
             className="text-foreground"
             onClick={()=>{
              router.push("/login")
             }}
             >

              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={()=>{
              router.push("/register")
            }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
               <Moon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-6 shadow-lg h-screen overflow-y-auto pb-20">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium transition-colors hover:text-primary py-2 ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="h-px bg-gray-100 my-4" />
            
            <Button variant="ghost" 
            className="justify-start px-0 hover:bg-transparent text-foreground"
            onClick={()=>{
              router.push("/login")
            }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={()=>{
              router.push("/register")
            }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
