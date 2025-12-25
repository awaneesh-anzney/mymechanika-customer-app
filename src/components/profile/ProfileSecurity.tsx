"use client";

import React from 'react';
import { Lock, Smartphone, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ProfileSecurity = () => {
    return (
        <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3 min-h-[520px]">
            <CardContent className="p-6 space-y-6">

                {/* Change Password Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Lock className="w-5 h-5 text-primary" />
                        <h3>Change Password</h3>
                    </div>
                    <div className="grid grid-cols-1 space-y-4 max-w-xl">
                        <div className="space-y-2">
                            <Label htmlFor="current-pass">Current Password</Label>
                            <Input id="current-pass" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-pass">New Password</Label>
                            <Input id="new-pass" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-pass">Confirm New Password</Label>
                            <Input id="confirm-pass" type="password" placeholder="••••••••" />
                        </div>
                        <Button className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                            Update Password
                        </Button>
                    </div>
                </div>

                <div className="h-[1px] bg-border w-full my-6" />

                {/* 2FA Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <h3>Two-Factor Authentication</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            Enable 2FA
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
