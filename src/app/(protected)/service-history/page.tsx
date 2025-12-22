"use client";

import React from 'react';
import { Wallet2 } from 'lucide-react';
import { ServiceStats } from '@/components/history/ServiceStats';
import { ServiceHistoryList } from '@/components/history/ServiceHistoryList';

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

export default function ServiceHistoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-2">
      <ServiceStats stats={stats} />
      <ServiceHistoryList records={records} />
    </div>
  );
}


