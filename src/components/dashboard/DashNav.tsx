"use client";

import { Bell, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cart } from "@/components/Cart";
import { ProfileMenu } from "@/components/dashboard/ProfileMenu";
import { NotificationsMenu } from "@/components/dashboard/NotificationsMenu";
import { useAuth } from "@/components/auth-provider";

interface DashNavProps {
  setMobileOpen: (open: boolean) => void;
  title?: string;
  subtitle?: string;
}


const getPageConfig = (pathname: string) => {
  if (pathname.startsWith('/my-vehicles')) {
    return { title: 'My Vehicles', subtitle: 'Manage your registered vehicles' };
  }
  if (pathname.startsWith('/my-profile')) {
    return { title: 'My Profile', subtitle: 'Manage your personal information' };
  }
  if (pathname.startsWith('/my-booking')) {
    return { title: 'Book Service', subtitle: 'Schedule a new service' };
  }
  if (pathname.startsWith('/my-history')) {
    return { title: 'Service History', subtitle: 'View past services and invoices' };
  }
  if (pathname.startsWith('/my-messages')) {
    return { title: 'Messages', subtitle: 'Chat with support or mechanics' };
  }
  // if (pathname.startsWith('/my-settings')) {
  //   return { title: 'Settings', subtitle: 'App preferences and configurations' };
  // }
  // Default to Dashboard
  return { title: 'Dashboard', subtitle: 'Welcome back, John!' };
};

const DashNav = ({ setMobileOpen, title: propTitle, subtitle: propSubtitle }: DashNavProps) => {
  const pathname = usePathname();
  const config = getPageConfig(pathname);
  const { user } = useAuth();

  const title = propTitle || config.title;
  // If config returns the default static message, replace it with dynamic one
  const dynamicSubtitle = config.subtitle === 'Welcome back, John!'
    ? `Welcome back, ${user?.name || 'User'}!`
    : config.subtitle;

  const subtitle = propSubtitle || dynamicSubtitle;


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
          <h1 className="font-display font-bold text-xl text-foreground">{title}</h1>

          <p className="text-sm text-muted-foreground hidden md:block">{subtitle}</p>

        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search..."
            className="w-64 pl-9 h-9 bg-muted/40 border border-input focus:bg-background transition-colors"
          />
        </div>

        {/* Mobile Search Icon (optional, if space is tight) */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        <Cart />

        <NotificationsMenu />

        <ProfileMenu />
      </div>
    </header>
  );
};

export default DashNav;