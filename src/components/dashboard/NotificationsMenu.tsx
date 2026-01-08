"use client";

import { Bell, Check } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Dummy data for notifications
const DUMMY_NOTIFICATIONS = [
    {
        id: "1",
        title: "Service Reminder",
        message: "Your car service is due in 3 days.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: "2",
        title: "Booking Confirmed",
        message: "Your appointment for Dec 15th is confirmed.",
        time: "1 day ago",
        read: true,
    },
    {
        id: "3",
        title: "New Feature",
        message: "Check out our new tracking feature!",
        time: "3 days ago",
        read: true,
    }
];

export function NotificationsMenu() {
    const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 bg-card border-border shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="h-auto px-2 py-1 text-xs text-primary hover:text-primary/80"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`
                                        flex flex-col gap-1 p-4 border-b border-border/50 last:border-0 cursor-pointer transition-colors
                                        ${notification.read ? 'bg-background hover:bg-muted/50' : 'bg-muted/30 hover:bg-muted'}
                                    `}
                                    onClick={() => handleNotificationClick(notification.id)}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {notification.title}
                                        </span>
                                        {!notification.read && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {notification.message}
                                    </p>
                                    <span className="text-[10px] text-muted-foreground/70 mt-1">
                                        {notification.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
                            <Bell className="w-8 h-8 opacity-20 mb-2" />
                            <p className="text-sm">No notifications yet</p>
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t border-border/50 bg-muted/20">
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                        View all notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
