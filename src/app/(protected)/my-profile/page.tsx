"use client";

import React, { useState } from 'react';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfilePersonal } from '@/components/profile/ProfilePersonal';
import { ProfileNotifications } from '@/components/profile/ProfileNotifications';
import { ProfileSecurity } from '@/components/profile/ProfileSecurity';
import { cn } from '@/lib/utils';

export default function MyProfilePage() {
    const [activeTab, setActiveTab] = useState<'personal' | 'notifications' | 'security'>('personal');

    const tabs = [
        { id: 'personal', label: 'Personal' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
    ] as const;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8">

                {/* Left Sidebar - 4 Columns */}
                <div className="col-span-4 space-y-6">
                    <ProfileSidebar />
                </div>

                {/* Right Content Area - 8 Columns */}
                <div className="col-span-8 space-y-6">
                    {/* Custom Tabs */}
                    <div className="flex items-center p-1 bg-muted/50 rounded-lg w-full sm:w-fit border border-border/50">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 sm:flex-none px-6 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                    activeTab === tab.id
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content */}
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        {activeTab === 'personal' && <ProfilePersonal />}
                        {activeTab === 'notifications' && <ProfileNotifications />}
                        {activeTab === 'security' && <ProfileSecurity />}
                    </div>
                </div>
            </div>
        </div>
    );
}
