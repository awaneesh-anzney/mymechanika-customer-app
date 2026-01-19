
"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Conversation } from "./data";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-primary/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={cn(
              "w-full flex items-start gap-3 p-4 text-left transition-colors border-b border-border/50 last:border-0 hover:bg-muted/30",
              selectedId === chat.id ? "bg-muted/50" : ""
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-sm font-medium",
              chat.user.avatarColor
            )}>
              {chat.user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold text-sm truncate text-foreground">{chat.user.name}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.lastMessageTime}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <p className="text-xs text-muted-foreground truncate line-clamp-1">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
