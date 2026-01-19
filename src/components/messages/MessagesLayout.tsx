
"use client";

import * as React from "react";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { conversations } from "./data";

export function MessagesLayout() {
  const [selectedId, setSelectedId] = React.useState<string>(conversations[0]?.id || "");

  const selectedConversation = conversations.find(c => c.id === selectedId) || conversations[0];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      <div className={
        "w-full md:w-1/3 min-w-[300px] flex-col h-full " +
        (selectedConversation ? "hidden md:flex" : "flex")
      }>
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <div className={
        "flex-1 min-w-0 h-full " +
        (selectedConversation ? "flex" : "hidden md:flex")
      }>
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-card rounded-2xl border border-border text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
