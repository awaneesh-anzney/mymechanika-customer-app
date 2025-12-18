"use client";

import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Edit,
    Camera,
    Shield,
    Car,
    Wrench,
    Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function MyProfilePage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">

            {/* Profile Header Card */}
            <Card className="border-border/60 shadow-sm overflow-hidden bg-card">
                <div className="h-32 bg-primary/10 w-full relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10 opacity-50" />
                </div>
                <CardContent className="px-6 pb-6 relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-2 gap-4 sm:gap-6">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-background border-4 border-card flex items-center justify-center text-primary text-3xl font-display font-bold shadow-md overflow-hidden">
                                <span className="group-hover:opacity-20 transition-opacity">JD</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/40 text-white">
                                <Camera className="w-6 h-6" />
                            </div>
                            <button className="absolute bottom-1 right-1 p-1.5 bg-primary rounded-full text-primary-foreground border-2 border-background shadow-sm hover:scale-110 transition-transform">
                                <Edit className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Name & Info */}
                        <div className="flex-1 text-center sm:text-left mb-2 sm:mb-2">
                            <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground mt-1">
                                <Shield className="w-3.5 h-3.5 text-green-600" />
                                <span>Verified Member</span>
                                <span>•</span>
                                <span>Since Jan 2024</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mb-2 sm:mb-2">
                            <Button variant="outline" size="sm">Change Password</Button>
                            <Button size="sm">Save Profile</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border/60 shadow-sm h-full">
                        <CardHeader className="pb-4 border-b border-border/40">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <span className="w-1 h-4 bg-primary rounded-full" />
                                Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" defaultValue="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" defaultValue="john.doe@email.com" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Postal Code</Label>
                                    <Input id="zip" defaultValue="12345" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="address" defaultValue="123 Main Street, City, State" className="pl-9" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Statistics & Preferences */}
                <div className="space-y-6">
                    {/* Account Overview Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-border/60 shadow-sm col-span-2">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                        <Car className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase">Vehicles</p>
                                        <p className="text-xl font-bold">3</p>
                                    </div>
                                </div>
                                <div className="h-8 w-[1px] bg-border" />
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600">
                                        <Wrench className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase">Services</p>
                                        <p className="text-xl font-bold">12</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Loyalty Card */}
                    <Card className="border-border/60 shadow-sm bg-linear-to-br from-card to-muted/20">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Loyalty Status</p>
                                    <h3 className="text-2xl font-bold text-foreground mt-1">Gold Member</h3>
                                </div>
                                <Award className="w-8 h-8 text-yellow-500" />
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-2">
                                <div className="bg-yellow-500 h-2 rounded-full w-[75%]" />
                            </div>
                            <p className="text-xs text-muted-foreground">450 / 600 points to Platinum</p>
                        </CardContent>
                    </Card>

                    {/* Preferences */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/40">
                            <CardTitle className="text-base font-bold">Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0 divide-y divide-border/40">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-medium">Email Updates</p>
                                    <p className="text-xs text-muted-foreground">Order & Service status</p>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">On</Badge>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-medium">SMS Notifications</p>
                                    <p className="text-xs text-muted-foreground">Reminders & OTPs</p>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">On</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
