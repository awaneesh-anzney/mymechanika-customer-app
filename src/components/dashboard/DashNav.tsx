"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashNavProps {
  setMobileOpen: (open: boolean) => void;
}

const DashNav = ({ setMobileOpen }: DashNavProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </Button>

        <div>
          <h1 className="font-display font-bold text-xl text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground hidden md:block">Welcome back, John!</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 h-9 bg-muted/40 border border-input focus:bg-background transition-colors"
          />
        </div>

        {/* Mobile Search Icon (optional, if space is tight) */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">JD</span>
        </div>
      </div>
    </header>
  );
};

export default DashNav;