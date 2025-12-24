"use client";

import React from 'react';
import {
    Search,
    Download,
    SlidersHorizontal,
    Link2,
    Car,
    CalendarRange,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceHistoryListProps {
    records: any[];
}

const statusClasses: Record<string, string> = {
    Completed: "bg-green-50 text-green-700 border-green-100",
    Scheduled: "bg-amber-50 text-amber-700 border-amber-100",
};

export const ServiceHistoryList = ({ records }: ServiceHistoryListProps) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: dropdowns */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Select defaultValue="all">
                            <SelectTrigger className="rounded-xl transition-all duration-300 hover:bg-muted/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40">
                                <SelectValue placeholder="All Vehicles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Vehicles</SelectItem>
                                <SelectItem value="camry">Toyota Camry</SelectItem>
                                <SelectItem value="civic">Honda Civic</SelectItem>
                                <SelectItem value="focus">Ford Focus</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all-time">
                            <SelectTrigger className="rounded-xl transition-all duration-300 hover:bg-muted/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40">
                                <SelectValue placeholder="All Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-time">All Time</SelectItem>
                                <SelectItem value="last-30">Last 30 days</SelectItem>
                                <SelectItem value="last-90">Last 90 days</SelectItem>
                                <SelectItem value="ytd">Year to date</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Middle: search */}
                    <div className="flex lg:flex-1 lg:justify-center">
                        <div className="group w-full lg:max-w-[520px] flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 transition-all duration-300 hover:bg-muted/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-muted/80">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                name="search"
                                autoComplete="off"
                                placeholder="Search services..."
                                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    {/* Right: actions */}
                    <div className="flex items-center gap-2 lg:justify-end">
                        <Button variant="outline" className="gap-2 border-border shadow-none hover:shadow-sm">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                            <SlidersHorizontal className="w-4 h-4" />
                            Manage
                        </Button>
                    </div>
                </div>
            </div>

            <Card className="rounded-2xl shadow-sm border-border">
                <CardHeader className="flex flex-col gap-1 border-b border-border">
                    <CardTitle className="text-xl font-display font-bold">Service Records</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Detailed view of every service you&apos;ve completed
                    </p>
                </CardHeader>
                <CardContent className="divide-y divide-border p-0">
                    {records.map((record) => (
                        <div
                            key={record.invoice}
                            className="group relative flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between transition-all duration-300 hover:bg-muted/30 hover:-translate-y-px"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-r from-primary/6 via-transparent to-secondary/6" />
                            <div className="pointer-events-none absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                                    <Link2 className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-foreground">{record.title}</h3>
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Car className="w-4 h-4" />
                                                {record.vehicle}
                                            </span>
                                            <span className="text-muted-foreground">•</span>
                                            <span>{record.provider}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <CalendarRange className="w-4 h-4" />
                                            {record.date}
                                        </span>
                                        <span
                                            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs ${statusClasses[record.status]}`}
                                        >
                                            {record.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end justify-between gap-3 md:min-w-[220px] md:flex-col md:items-end">
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-foreground">{record.price}</div>
                                    <div className="text-xs text-muted-foreground">{record.invoice}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-9 w-9 border-border shadow-none hover:shadow-md hover:border-primary/30 hover:ring-1 hover:ring-primary/20 transition-all">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-9 w-9 border-border shadow-none hover:shadow-md hover:border-primary/30 hover:ring-1 hover:ring-primary/20 transition-all">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};
