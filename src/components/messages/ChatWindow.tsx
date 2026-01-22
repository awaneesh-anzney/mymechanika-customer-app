
"use client";

import * as React from "react";
import { Phone, MoreVertical, Paperclip, Send, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Conversation, CURRENT_USER_ID } from "./data";

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium",
            conversation.user.avatarColor
          )}>
            {conversation.user.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{conversation.user.name}</h3>
            <p className="text-xs text-primary font-medium">
              {conversation.user.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30"
      >
        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === CURRENT_USER_ID;
          return (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[80%]",
                isMe ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "px-4 py-3 rounded-2xl text-sm shadow-sm",
                  isMe
                    ? "bg-secondary text-secondary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                )}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-[10px] text-muted-foreground">
                  {msg.timestamp}
                </span>
                {isMe && (
                  msg.isRead ? (
                    <CheckCheck className="h-3 w-3 text-secondary" />
                  ) : (
                    <Check className="h-3 w-3 text-muted-foreground" />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-white">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 mb-0.5">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              className="min-h-[44px] py-3 px-4 bg-muted/30 border-border/50 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <Button
            size="icon"
            className="mb-0.5 rounded-xl h-11 w-11 shrink-0 bg-secondary hover:bg-secondary/90 text-white shadow-md shadow-secondary/20 transition-all active:scale-95"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
