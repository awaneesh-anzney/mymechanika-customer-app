"use client";

import React from 'react';
import { Camera, Shield, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ProfileSidebar = () => {
    return (
        <Card className="border-border shadow-md bg-card overflow-hidden h-fit">
            <CardContent className="p-6 flex flex-col items-center text-center">
                {/* Avatar Section */}
                <div className="relative mb-4 group">
                    <div className="w-32 h-32 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <Button
                        size="icon"
                        className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 border-2 border-background shadow-sm"
                    >
                        <Camera className="w-4 h-4 text-primary-foreground" />
                    </Button>
                </div>

                {/* Name & Email */}
                <h2 className="text-xl font-bold text-foreground">Rahul Sharma</h2>
                <p className="text-sm text-muted-foreground mb-4">rahul.sharma@email.com</p>

                <Badge className="bg-primary hover:bg-primary/90 mb-6 px-4 py-1.5 text-sm">
                    Premium Member
                </Badge>

                {/* Stats List */}
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Member Since</p>
                            <p className="text-sm font-semibold text-foreground">January 2023</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Account Status</p>
                            <p className="text-sm font-semibold text-emerald-600">Verified</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Total Spent</p>
                            <p className="text-sm font-semibold text-foreground">₹45,750</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
