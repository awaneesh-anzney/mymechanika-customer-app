import React from 'react';
import {
    Car,
    Calendar,
    Clock,
    Wrench,
    ArrowRight,
    CalendarDays,
    MessageSquare,
    Phone,
    MapPin,
    MoreHorizontal,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define interfaces for data structure to avoid "hardcoding" look and feel in the component body
interface StatData {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
    bg: string;
}

interface ServiceData {
    id: number;
    service: string;
    vehicle: string;
    date: string;
    status: "Scheduled" | "Completed" | "Cancelled";
    icon: React.ElementType;
}

interface ActiveServiceData {
    vehicle: string;
    service: string;
    status: string;
    progress: number;
    tag: string;
}

interface BookingData {
    id: string;
    service: string;
    date: string;
    status: string;
    amount: string;
}

// Mock Data - In a real app, this would be fetched from an API
const stats: StatData[] = [
    { label: "Total Vehicles", value: "3", icon: Car, color: "text-primary", bg: "bg-primary/10" },
    { label: "Upcoming Bookings", value: "2", icon: Calendar, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Loyalty Points", value: "450", icon: Clock, color: "text-chart-4", bg: "bg-chart-4/10" },
    { label: "Total Services", value: "12", icon: Wrench, color: "text-chart-2", bg: "bg-chart-2/10" },
];

const upcomingServices: ServiceData[] = [
    {
        id: 1,
        service: "Oil Change",
        vehicle: "Toyota Camry 2021",
        date: "Dec 15, 2024 at 10:00 AM",
        status: "Scheduled",
        icon: CalendarDays
    },
    {
        id: 2,
        service: "Brake Inspection",
        vehicle: "Honda Civic 2020",
        date: "Dec 18, 2024 at 2:00 PM",
        status: "Scheduled",
        icon: CalendarDays
    }
];

const activeService: ActiveServiceData = {
    vehicle: "Ford Focus 2019",
    service: "Full Service at Elite Motors",
    status: "Engine inspection complete. Replacing air filter.",
    progress: 75, // Increased progress
    tag: "In Progress"
};

const recentBookings: BookingData[] = [
    { id: "BK-2024-001", service: "General Service", date: "Dec 01, 2024", status: "Completed", amount: "$150.00" },
    { id: "BK-2024-002", service: "Tyre Replacement", date: "Nov 20, 2024", status: "Completed", amount: "$320.00" },
    { id: "BK-2024-003", service: "Battery Check", date: "Nov 15, 2024", status: "Completed", amount: "$0.00" },
];

const DashboardContent = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="shadow-none border-border hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-display font-bold text-foreground">{stat.value}</h3>
                            </div>
                            <div className={cn("p-3 rounded-xl transition-colors", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                {/* Row 1, Col 1-2: Active Service */}
                <Card className="lg:col-span-2 shadow-sm border-border/60 overflow-hidden relative group h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
                        <CardTitle className="text-lg font-display font-bold">Active Service</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="animate-pulse w-2 h-2 rounded-full bg-primary"></span>
                            <span className="text-sm font-medium text-primary">{activeService.tag}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-5">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                <Car className="w-7 h-7 text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-foreground leading-tight">{activeService.vehicle}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                                    <MapPin className="w-3.5 h-3.5" /> {activeService.service}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-muted-foreground">Service Progress</span>
                                <span className="font-bold text-primary">{activeService.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out relative"
                                    style={{ width: `${activeService.progress}%` }}
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-full bg-linear-to-l from-white/20 to-transparent"></div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground italic">
                                "{activeService.status}"
                            </p>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm mt-2" size="lg">
                            Track Live Status <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Row 1, Col 3: Quick Actions */}
                <Card className="shadow-sm border-border/60 h-full flex flex-col">
                    <CardHeader className="py-4 px-5">
                        <CardTitle className="text-base font-display font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2.5 px-4 pb-4 flex-1">
                        {[
                            { label: "Book Now", icon: Calendar, path: "/dashboard/book", color: "text-primary" },
                            { label: "Vehicles", icon: Car, path: "/dashboard/vehicles", color: "text-secondary" },
                            { label: "Help", icon: Phone, path: "/dashboard/support", color: "text-chart-5" },
                            { label: "Chat", icon: MessageSquare, path: "/dashboard/messages", color: "text-chart-2" },
                        ].map((action, i) => (
                            <Button
                                key={i}
                                variant="outline"
                                className="h-full min-h-[5rem] flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="p-1.5 rounded-full bg-background shadow-xs group-hover:scale-110 transition-transform duration-300">
                                    <action.icon className={cn("w-5 h-5", action.color)} />
                                </div>
                                <span className="font-medium text-[11px]">{action.label}</span>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Row 2, Col 1-2: Recent History */}
                <Card className="lg:col-span-2 shadow-sm border-border/60 h-full">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
                        <CardTitle className="text-lg font-display font-bold">Recent History</CardTitle>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary h-8 text-xs">View All</Button>
                    </CardHeader>
                    <CardContent className="px-0 pb-2">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-y border-border/50">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Service</th>
                                        <th className="px-5 py-3 font-medium">Date</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5 font-medium">{booking.service}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{booking.date}</td>
                                            <td className="px-5 py-3.5">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                                                    booking.status === "Completed" ? "bg-green-500/10 text-green-700 border-green-200" : "bg-muted text-muted-foreground border-border"
                                                )}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right font-medium">{booking.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Row 2, Col 3: Upcoming Services */}
                <Card className="shadow-sm border-border/60 h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
                        <CardTitle className="text-base font-display font-bold">Upcoming</CardTitle>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-3 px-4 pb-4 flex-1">
                        {upcomingServices.map((service) => (
                            <div key={service.id} className="group relative p-3 rounded-lg border border-border/60 bg-card hover:border-primary/30 hover:shadow-xs transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/80 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex items-start gap-3 w-full">
                                        <div className="p-2 rounded-md bg-secondary/10 text-secondary shrink-0 mt-0.5">
                                            <service.icon className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-1 w-full">
                                            <div className="flex justify-between items-start w-full">
                                                <h4 className="font-semibold text-sm text-foreground leading-none">{service.service}</h4>
                                                <Badge variant="outline" className="text-[9px] h-4 px-1.5 font-normal border-border/50 bg-background/50">
                                                    {service.status}
                                                </Badge>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                                                <Car className="w-3 h-3" /> {service.vehicle}
                                            </p>
                                            <div className="flex items-center text-[10px] font-medium text-muted-foreground/90 pt-1">
                                                <Calendar className="w-3 h-3 mr-1.5 text-primary/70" />
                                                {service.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {upcomingServices.length === 0 && (
                            <div className="text-center py-6">
                                <p className="text-xs text-muted-foreground">No upcoming services</p>
                            </div>
                        )}
                        <div className="mt-auto pt-2">
                            <Button variant="outline" size="sm" className="w-full border-dashed h-8 text-xs hover:border-primary/50 hover:text-primary transition-colors">
                                <Plus className="w-3.5 h-3.5 mr-1.5" /> Schedule Service
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardContent;
