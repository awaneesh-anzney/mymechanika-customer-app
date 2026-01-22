"use client";

import React, { useEffect, useState } from 'react';
import { Mail, Phone, User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfilePersonal = () => {
    const { data: user, isLoading: isProfileLoading } = useProfile();
    const updateProfileMutation = useUpdateProfile();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSave = () => {
        updateProfileMutation.mutate({
            name,
            email
        });
    };

    const handleCancel = () => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    };

    if (isProfileLoading) {
        return <Skeleton className="h-[520px] w-full" />;
    }

    return (
        <Card className="border-border shadow-md bg-card -mt-2 md:-mt-3 min-h-[520px]">
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" /> Full Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-muted/30 border-border/50 focus:bg-background h-11"
                        />
                    </div>

                    {/* Phone - Full Width - Read Only for now as per separate flow */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" /> Phone Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="phone"
                                value={user?.phone || ''}
                                disabled
                                className="bg-muted/30 border-border/50 focus:bg-background h-11 pr-20"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">To change phone number, please use the security settings or contact support.</p>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                    <Button variant="outline" onClick={handleCancel} className="h-10 px-6 gap-2" disabled={updateProfileMutation.isPending}>
                        <X className="w-4 h-4" /> Cancel
                    </Button>
                    <Button onClick={handleSave} className="h-10 px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={updateProfileMutation.isPending}>
                        {updateProfileMutation.isPending ? 'Saving...' : <><Check className="w-4 h-4" /> Save Changes</>}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
