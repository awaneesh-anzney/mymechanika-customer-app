"use client";

import React from 'react';
import { Mail, Phone, MapPin, User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export const ProfilePersonal = () => {
    return (
        <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3">
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" /> First Name
                        </Label>
                        <Input
                            id="firstName"
                            defaultValue="Rahul"
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" /> Last Name
                        </Label>
                        <Input
                            id="lastName"
                            defaultValue="Sharma"
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>

                    {/* Email - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" /> Email Address
                        </Label>
                        <Input
                            id="email"
                            defaultValue="rahul.sharma@email.com"
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>

                    {/* Phone - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" /> Phone Number
                        </Label>
                        <Input
                            id="phone"
                            defaultValue="+91 98765 43210"
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>

                    {/* Address - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" /> Address
                        </Label>
                        <Input
                            id="address"
                            defaultValue="123, Park Street, Mumbai, Maharashtra 400001"
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                    <Button variant="outline" className="h-10 px-6 gap-2">
                        <X className="w-4 h-4" /> Cancel
                    </Button>
                    <Button className="h-10 px-6 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Check className="w-4 h-4" /> Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
