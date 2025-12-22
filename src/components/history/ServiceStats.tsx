"use client";

import React from 'react';
import { Wallet2 } from 'lucide-react';

interface ServiceStatsProps {
    stats: {
        label: string;
        value: string;
        icon?: any;
    }[];
}

export const ServiceStats = ({ stats }: ServiceStatsProps) => {
    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-5 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:ring-1 hover:ring-primary/20"
                >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-primary/20 via-transparent to-secondary/20" />
                    <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <p className="text-base font-bold text-foreground mb-0.5">{item.label}</p>
                            <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        </div>
                        {item.icon && (
                            <span className="rounded-lg bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1">
                                <item.icon className="w-5 h-5" />
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
