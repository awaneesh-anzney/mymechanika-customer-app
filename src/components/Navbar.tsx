"use client";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, LogIn } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#0F52BA] ${
                  item.href === "/"
                    ? "text-[#0F52BA] underline underline-offset-4"
                    : "text-[#222222]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-[#222222]">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-[#0F52BA] hover:bg-[#0F52BA]/90 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}


