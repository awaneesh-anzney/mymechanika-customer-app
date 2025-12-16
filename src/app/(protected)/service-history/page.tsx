"use client";

import {
  Car,
  CalendarRange,
  Download,
  Eye,
  Link2,
  Search,
  SlidersHorizontal,
  Wallet2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { label: "Total Services", value: "12" },
  { label: "Total Spent", value: "$705", icon: Wallet2 },
  { label: "Last Service", value: "Nov 20" },
  { label: "Vehicles Serviced", value: "3" },
];

const records = [
  {
    title: "Oil Change",
    vehicle: "Toyota Camry 2021",
    provider: "AutoCare Plus",
    date: "Nov 20, 2024",
    status: "Completed",
    price: "$49",
    invoice: "INV-2024-001",
  },
  {
    title: "Brake Inspection & Pad Replacement",
    vehicle: "Honda Civic 2020",
    provider: "QuickFix Garage",
    date: "Oct 15, 2024",
    status: "Completed",
    price: "$189",
    invoice: "INV-2024-002",
  },
  {
    title: "Full Service",
    vehicle: "Ford Focus 2019",
    provider: "Elite Motors",
    date: "Sep 05, 2024",
    status: "Completed",
    price: "$299",
    invoice: "INV-2024-003",
  },
];

const statusClasses: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-100",
  Scheduled: "bg-amber-50 text-amber-700 border-amber-100",
};

const ServiceHistoryPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Service History</h1>
          <p className="text-muted-foreground">View all your past vehicle services</p>
        </div>
        <div className="flex items-center gap-2">
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

      <Card className="rounded-2xl shadow-none border-border hover:shadow-md transition-shadow duration-300">
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="rounded-xl">
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
                <SelectTrigger className="rounded-xl">
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
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card px-4 py-5 shadow-none hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  </div>
                  {item.icon && (
                    <span className="rounded-lg bg-primary/10 p-3 text-primary">
                      <item.icon className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-sm">
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
                  <Button variant="outline" size="icon" className="h-9 w-9 border-border shadow-none hover:shadow-sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 border-border shadow-none hover:shadow-sm">
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

export default ServiceHistoryPage;


