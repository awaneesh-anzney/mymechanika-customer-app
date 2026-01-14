"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashNav from "@/components/dashboard/DashNav";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const header = useMemo(() => {
    if (pathname?.startsWith("/service-history")) {
      return {
        title: "Service History",
        subtitle: "View all your past vehicle services",
      };
    }
    return {
      title: "Dashboard",
      subtitle: `Welcome back, ${user?.name || "User"}!`,
    };
  }, [pathname, user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content */}
        <div className={cn(
          "min-h-screen transition-all duration-300",
          // Mobile: always 0 margin (sidebar is overlay)
          "ml-0",
          // Desktop: dynamic margin based on collapse state
          collapsed ? "md:ml-20" : "md:ml-64"
        )}>
          <DashNav
            setMobileOpen={setMobileOpen}
            title={header.title}
            subtitle={header.subtitle}
          />

          {/* Content */}
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
