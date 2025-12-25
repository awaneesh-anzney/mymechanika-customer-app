"use client";

import React from 'react';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const ProfileNotifications = () => {
    return (
        <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3 min-h-[520px]">
            <CardContent className="p-6 space-y-6">
                <div className="space-y-6">
                    {/* Marketing Emails */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/10">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive updates about your bookings and exclusive offers via email.
                                </p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/10">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get important service reminders and OTPs directly to your phone.
                                </p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/10">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive real-time updates about your car service status.
                                </p>
                            </div>
                        </div>
                        <Switch />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Save Preferences
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
