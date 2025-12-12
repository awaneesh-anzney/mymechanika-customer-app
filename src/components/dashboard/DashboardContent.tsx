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
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main Content Column */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Active Service Card */}
                    <Card className="shadow-sm border-border overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-display font-bold">Active Service</CardTitle>
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse w-2 h-2 rounded-full bg-primary"></span>
                                <span className="text-sm font-medium text-primary">{activeService.tag}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Car className="w-8 h-8 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-foreground">{activeService.vehicle}</h3>
                                    <p className="text-muted-foreground flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {activeService.service}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-muted-foreground">Service Progress</span>
                                    <span className="font-bold text-primary">{activeService.progress}%</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden">
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

                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-sm" size="lg">
                                Track Live Status <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Bookings Section */}
                    <Card className="shadow-sm border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-display font-bold">Recent History</CardTitle>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Booking ID</th>
                                            <th className="px-4 py-3">Service</th>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 rounded-r-lg text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map((booking) => (
                                            <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                                <td className="px-4 py-4 font-medium">{booking.id}</td>
                                                <td className="px-4 py-4">{booking.service}</td>
                                                <td className="px-4 py-4 text-muted-foreground">{booking.date}</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right font-medium">{booking.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card className="shadow-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-display font-bold">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Book Now", icon: Calendar, path: "/dashboard/book", color: "text-primary" },
                                { label: "Vehicles", icon: Car, path: "/dashboard/vehicles", color: "text-secondary" },
                                { label: "Help", icon: Phone, path: "/dashboard/support", color: "text-chart-5" },
                                { label: "Chat", icon: MessageSquare, path: "/dashboard/messages", color: "text-chart-2" },
                            ].map((action, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                >
                                    <div className="p-2 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <action.icon className={cn("w-6 h-6", action.color)} />
                                    </div>
                                    <span className="font-medium text-xs">{action.label}</span>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Upcoming Services */}
                    <Card className="shadow-sm border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-display font-bold">Upcoming</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingServices.map((service) => (
                                <div key={service.id} className="group relative p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300">
                                    {/* Decoration line */}
                                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex justify-between items-start mb-2 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <service.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-foreground">{service.service}</h4>
                                                <p className="text-xs text-muted-foreground">{service.vehicle}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pl-2 flex items-center justify-between">
                                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" /> {service.date}
                                        </p>
                                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                            {service.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {upcomingServices.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No upcoming services</p>
                                </div>
                            )}
                            <Button variant="outline" className="w-full mt-2 border-dashed">
                                + Schedule Service
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
