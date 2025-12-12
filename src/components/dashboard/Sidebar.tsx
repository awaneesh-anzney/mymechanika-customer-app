"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Car,
    Calendar,
    History,
    MessageSquare,
    User,
    Settings,
    LogOut,
    Wrench,
    ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define your routes here
const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Car, label: "My Vehicles", path: "/dashboard/vehicles" },
    { icon: Calendar, label: "Book Service", path: "/dashboard/book" },
    { icon: History, label: "Service History", path: "/dashboard/history" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-50",
                    // Mobile styles
                    "w-64 -translate-x-full md:translate-x-0",
                    mobileOpen && "translate-x-0",
                    // Desktop styles (override mobile width)
                    collapsed ? "md:w-20" : "md:w-64"
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <Wrench className="w-5 h-5 text-primary-foreground" />
                        </div>
                        {(!collapsed || mobileOpen) && (
                            <span className="font-display font-bold text-lg text-foreground md:block hidden group-hover:block">
                                <span className={cn("md:block", collapsed ? "hidden" : "block")}>
                                    My<span className="text-primary">Mechanika</span>
                                </span>
                                {/* Mobile always shows full logo */}
                                <span className="md:hidden block">
                                    My<span className="text-primary">Mechanika</span>
                                </span>
                            </span>
                        )}
                    </Link>

                    {/* Desktop Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors hidden md:block"
                    >
                        <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors md:hidden"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)} // Close on mobile click
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary-foreground")} />

                                        {/* Label: Hidden if collapsed on desktop, visible on mobile */}
                                        <span className={cn(
                                            "font-medium whitespace-nowrap transition-all duration-300",
                                            collapsed ? "md:hidden" : "md:block",
                                            "block" // Always block on mobile logic (since width is fixed 64)
                                        )}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full text-muted-foreground hover:text-destructive",
                            collapsed ? "md:px-0 md:justify-center" : "md:justify-start",
                            "justify-start" // Always left align on mobile
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className={cn(
                            "ml-2 transition-all duration-300",
                            collapsed ? "md:hidden" : "md:block",
                            "block"
                        )}>
                            Logout
                        </span>
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
