"use client";

import React, { useState } from 'react';
import { Lock, Smartphone, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useChangePassword } from '@/hooks/useProfile';

export const ProfileSecurity = () => {
    const changePasswordMutation = useChangePassword();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handlePasswordUpdate = () => {
        setError(null);
        setSuccessMessage(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (!newPassword || !currentPassword) {
            setError("Please fill in all fields.");
            return;
        }

        changePasswordMutation.mutate({
            currentPassword,
            newPassword,
            confirmPassword
        }, {
            onSuccess: (data) => {
                setSuccessMessage(data.message || "Password changed successfully");
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            },
            onError: (err: any) => {
                setError(err.response?.data?.message || err.message || "Failed to update password");
            }
        });
    };

    return (
        <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3 min-h-[520px]">
            <CardContent className="p-6 space-y-6">

                {/* Change Password Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Lock className="w-5 h-5 text-primary" />
                        <h3>Change Password</h3>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                    <div className="grid grid-cols-1 space-y-4 max-w-xl">
                        <div className="space-y-2">
                            <Label htmlFor="current-pass">Current Password</Label>
                            <Input
                                id="current-pass"
                                type="password"
                                placeholder="••••••••"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-pass">New Password</Label>
                            <Input
                                id="new-pass"
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-pass">Confirm New Password</Label>
                            <Input
                                id="confirm-pass"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handlePasswordUpdate}
                            disabled={changePasswordMutation.isPending}
                            className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
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
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" disabled>
                            Enable 2FA
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
