"use client";

import { User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "./ProfileAvatar";
import { useUploadProfilePhoto } from "@/hooks/useProfile";

export function ProfileMenu() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const uploadPhotoMutation = useUploadProfilePhoto();

    // Get initials from user name or default to 'U'
    const getInitials = () => {
        if (!user || !user.name) return "U";
        const names = user.name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    };

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    const handleImageUpdate = (blob: Blob) => {
        const file = new File([blob], "profile-photo.jpg", { type: "image/jpeg" });
        uploadPhotoMutation.mutate(file);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="cursor-pointer">
                    {/* Small Trigger Avatar */}
                    <ProfileAvatar
                        src={user?.profilePhoto}
                        alt={user?.name}
                        size={36}
                        editable={false} // Trigger is usually just a button
                        className="hover:ring-2 hover:ring-primary/20 rounded-full transition-all"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-2 bg-card border-border shadow-xl">
                <div className="flex flex-col items-center p-4 space-y-2">
                    {/* Large Editable Avatar */}
                    <ProfileAvatar
                        src={user?.profilePhoto}
                        alt={user?.name}
                        size={80}
                        editable={true}
                        onImageUpdate={handleImageUpdate}
                    />

                    <div className="text-center">
                        <p className="text-base font-medium leading-none mb-1">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <Separator className="my-1" />
                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal px-2 h-9"
                    onClick={() => router.push('/my-profile')}
                >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal px-2 h-9"
                    onClick={() => router.push('/my-settings')}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
                <Separator className="my-1" />
                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal px-2 h-9 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </PopoverContent>
        </Popover>
    );
}
