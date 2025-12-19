"use client";

import React from 'react';
import {
    Car,
    Calendar,
    Clock,
    AlertTriangle,
    Gift,
    Wallet,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardContent = () => {
    // Stats configuration
    const stats = [
        { label: "Total Vehicles", value: "3", icon: Car, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
        { label: "Total Bookings", value: "12", icon: Calendar, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        { label: "Upcoming Services", value: "2", icon: Clock, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
        { label: "Loyalty Points", value: "2,500", icon: Gift, iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
        { label: "Services Due", value: "1", icon: AlertTriangle, iconBg: "bg-red-50", iconColor: "text-red-500" },
        { label: "Total Savings", value: "AED 850", icon: Wallet, iconBg: "bg-green-50", iconColor: "text-green-500" },
    ];

    // Upcoming services data
    const upcomingServices = [
        { id: 1, serviceName: "Periodic Service", vehicle: "Toyota Camry", regNumber: "Dubai A 12345", dateTime: "Dec 18, 2024 at 10:00 AM", status: "Confirmed" as const },
        { id: 2, serviceName: "AC Service", vehicle: "BMW X5", regNumber: "Abu Dhabi B 67890", dateTime: "Dec 22, 2024 at 2:00 PM", status: "Pending" as const },
    ];

    // Vehicles data
    const vehicles = [
        { id: 1, brand: "Toyota", model: "Camry", regNumber: "Dubai A 12345", lastService: "Nov 15, 2024" },
        { id: 2, brand: "BMW", model: "X5", regNumber: "Abu Dhabi B 67890", lastService: "Oct 20, 2024" },
        { id: 3, brand: "Mercedes", model: "C-Cl", regNumber: "Sharjah C 11111", lastService: "Dec 1, 2024" },
    ];

    // Recent activity data
    const recentActivities = [
        { id: 1, action: "Service Completed", vehicle: "Toyota Camry", date: "Dec 10, 2024", amount: "AED 450" },
        { id: 2, action: "Booking Created", vehicle: "BMW X5", date: "Dec 08, 2024" },
        { id: 3, action: "Payment Received", vehicle: "Mercedes C-Class", date: "Dec 05, 2024", amount: "AED 320" },
    ];

    // Get current date formatted
    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header: Date + Book Service Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 gap-2 self-start sm:self-auto"
                >
                    <Plus className="w-5 h-5" />
                    Book Service
                </Button>
            </div>

            {/* Stats Grid - 6 Cards with Horizontal Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="group relative border border-border bg-gradient-to-br from-card to-muted/10 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 overflow-hidden"
                    >
                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />

                        <CardContent className="relative p-4 flex items-center gap-3">
                            {/* Icon - Left Side */}
                            <div className={cn(
                                "p-2.5 rounded-xl shadow-sm shrink-0 group-hover:shadow-md group-hover:scale-110 transition-all duration-300",
                                stat.iconBg
                            )}>
                                <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                            </div>

                            {/* Value & Label - Right Side, Vertically Centered */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">
                                    {stat.value}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-tight font-medium mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Two-Column Layout: Upcoming Services & My Vehicles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Services - Left Column */}
                <Card className="border border-border shadow-md bg-card">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-5 border-b border-border">
                        <CardTitle className="text-base font-bold text-foreground">Upcoming Services</CardTitle>
                        <Button variant="link" size="sm" className="text-primary p-0 h-auto font-medium text-sm hover:no-underline">View All</Button>
                    </CardHeader>
                    <CardContent className="px-5 py-4 space-y-4">
                        {upcomingServices.map((service) => (
                            <div key={service.id} className="p-4 rounded-xl border border-border shadow-sm bg-card hover:bg-muted/30 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1 flex-1">
                                        <h4 className="font-semibold text-foreground text-sm leading-tight">{service.serviceName}</h4>
                                        <p className="text-sm text-muted-foreground">{service.vehicle} · {service.regNumber}</p>
                                        <p className="text-xs text-muted-foreground">{service.dateTime}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-xs font-medium px-2.5 py-0.5 rounded-full border-0 shadow-sm",
                                                service.status === "Confirmed" && "bg-green-100 text-green-700",
                                                service.status === "Pending" && "bg-orange-100 text-orange-600"
                                            )}
                                        >
                                            {service.status}
                                        </Badge>
                                        <Button size="sm" variant="outline" className="h-8 text-xs font-medium rounded-md border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                                            Track
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* My Vehicles - Right Column */}
                <Card className="border border-border shadow-md bg-card">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-5 border-b border-border">
                        <CardTitle className="text-base font-bold text-foreground">My Vehicles</CardTitle>
                        <Button variant="link" size="sm" className="text-primary p-0 h-auto font-medium text-sm hover:no-underline">View All</Button>
                    </CardHeader>
                    <CardContent className="px-5 py-5">
                        {/* Vertical Grid Layout */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Vehicle Cards */}
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="p-4 rounded-xl border border-border shadow-md bg-card hover:border-primary hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer group"
                                >
                                    {/* Vehicle Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
                                        <Car className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    {/* Vehicle Info */}
                                    <div className="text-center space-y-1 w-full">
                                        <h4 className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
                                            {vehicle.brand} {vehicle.model}
                                        </h4>
                                        <p className="text-xs text-muted-foreground font-medium">{vehicle.regNumber}</p>
                                        <p className="text-[10px] text-muted-foreground/70">Last: {vehicle.lastService}</p>
                                    </div>
                                    {/* Book Service Button */}
                                    <Button size="sm" className="w-full h-8 text-xs bg-primary hover:bg-primary/90 rounded-md shadow-sm hover:shadow-md transition-all">
                                        Book Service
                                    </Button>
                                </div>
                            ))}

                            {/* Add Vehicle Card */}
                            <div className="p-4 rounded-xl border-2 border-dashed border-primary/50 shadow-sm bg-primary/5 hover:bg-primary/10 hover:border-primary hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer group">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
                                    <Plus className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">Add Vehicle</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Register new car</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border border-border shadow-md bg-card">
                <CardHeader className="flex flex-row items-center justify-between py-4 px-5 border-b border-border">
                    <CardTitle className="text-base font-bold text-foreground">Recent Activity</CardTitle>
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto font-medium text-sm hover:no-underline">View All</Button>
                </CardHeader>
                <CardContent className="px-5 py-4">
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border shadow-sm bg-card hover:bg-muted/30 hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
                                        <Calendar className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.vehicle} · {activity.date}</p>
                                    </div>
                                </div>
                                {activity.amount && (
                                    <span className="text-sm font-semibold text-foreground">{activity.amount}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardContent;
