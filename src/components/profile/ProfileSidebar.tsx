"use client";

import React, { useRef, useState } from 'react';
import { Camera, Shield, Calendar, CreditCard, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProfile, useUploadProfilePhoto } from '@/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ImageCropperDialog } from './ImageCropperDialog';

export const ProfileSidebar = () => {
    const { data: user, isLoading } = useProfile();
    const uploadPhotoMutation = useUploadProfilePhoto();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cropper State
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
                setIsCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again if needed
        event.target.value = '';
    };

    const handleCropComplete = (croppedFile: File) => {
        setIsCropperOpen(false);
        uploadPhotoMutation.mutate(croppedFile);
    };

    const handleCropperClose = () => {
        setIsCropperOpen(false);
        setSelectedImage(null);
    };

    if (isLoading) {
        return (
            <Card className="border-border shadow-md bg-card overflow-hidden h-fit">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (!user) return null;

    return (
        <Card className="border-border shadow-md bg-card overflow-hidden h-fit">
            <CardContent className="p-6 flex flex-col items-center text-center">
                {/* Avatar Section */}
                <div className="relative mb-4 group">
                    <div className="w-32 h-32 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
                        <img
                            src={user.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                            alt="Profile"
                            className={`w-full h-full object-cover transition-opacity duration-300 ${uploadPhotoMutation.isPending ? 'opacity-50' : 'opacity-100'}`}
                        />
                        {uploadPhotoMutation.isPending && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <Button
                        size="icon"
                        onClick={handlePhotoClick}
                        disabled={uploadPhotoMutation.isPending}
                        className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 border-2 border-background shadow-sm disabled:opacity-70"
                    >
                        {uploadPhotoMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" /> : <Camera className="w-4 h-4 text-primary-foreground" />}
                    </Button>
                </div>

                <ImageCropperDialog
                    open={isCropperOpen}
                    imageSrc={selectedImage}
                    onClose={handleCropperClose}
                    onCropComplete={handleCropComplete}
                />

                {/* Name & Email */}
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

                <Badge className="bg-primary hover:bg-primary/90 mb-6 px-4 py-1.5 text-sm">
                    {user.role} Member
                </Badge>

                {/* Stats List */}
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Member Since</p>
                            <p className="text-sm font-semibold text-foreground">
                                {user.createdAt ? format(new Date(user.createdAt), 'MMMM yyyy') : 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Account Status</p>
                            <p className={`text-sm font-semibold ${user.status === 'active' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </p>
                        </div>
                    </div>

                    {/* Credit Card / Spend logic would need transaction API, keeping static for now or hiding */}
                    {/* <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="p-2 rounded-md bg-background text-primary shadow-sm">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground font-medium">Total Spent</p>
                            <p className="text-sm font-semibold text-foreground">₹0</p>
                        </div>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    );
};
