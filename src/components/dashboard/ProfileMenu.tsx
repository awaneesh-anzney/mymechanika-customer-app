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

export function ProfileMenu() {
    const { user, logout } = useAuth();
    const router = useRouter();

    // Get initials from user name or default to 'U'
    const getInitials = () => {
        if (!user || !user.firstName) return "U";
        return `${user.firstName.charAt(0)}${user.lastName ? user.lastName.charAt(0) : ""}`.toUpperCase();
    };

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    // Placeholder update handler - usually this would call an API
    const handleImageUpdate = (blob: Blob) => {
        console.log("Image updated:", blob);
        // TODO: Upload blob to server via `authService.updateProfileImage` or similar
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="cursor-pointer">
                    {/* Small Trigger Avatar */}
                    <ProfileAvatar
                        src={user?.profileImage} // Assuming user object has this field, or null
                        alt={user?.firstName}
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
                        src={user?.profileImage}
                        alt={user?.firstName}
                        size={80}
                        editable={true}
                        onImageUpdate={handleImageUpdate}
                    />

                    <div className="text-center">
                        <p className="text-base font-medium leading-none mb-1">{user?.firstName} {user?.lastName}</p>
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
