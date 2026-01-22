
export interface User {
  id: string;
  name: string;
  avatar: string; // Initials or URL
  avatarColor: string; // Tailwind class for background
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string; // 'user' or other
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export const CURRENT_USER_ID = 'me';

export const conversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'ac',
      name: 'AutoCare Plus',
      avatar: 'AC',
      avatarColor: 'bg-blue-100 text-blue-600',
      isOnline: true,
    },
    lastMessage: 'We can definitely check it during the service. If it needs replacement, we\'ll let you know before proceeding.',
    lastMessageTime: '10:32 AM',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'ac',
        text: "Good morning! We've received your booking for an oil change on your Toyota Camry.",
        timestamp: '9:00 AM',
      },
      {
        id: 'm2',
        senderId: 'me',
        text: "Great! Is the appointment still at 10 AM?",
        timestamp: '9:15 AM',
        isRead: true,
      },
      {
        id: 'm3',
        senderId: 'ac',
        text: "Yes, we're all set for 10 AM. Please bring your vehicle 5 minutes early if possible.",
        timestamp: '9:18 AM',
      },
      {
        id: 'm4',
        senderId: 'me',
        text: "Perfect, I'll be there. Should I also check the air filter?",
        timestamp: '9:22 AM',
        isRead: true,
      },
      {
        id: 'm5',
        senderId: 'ac',
        text: "We can definitely check it during the service. If it needs replacement, we'll let you know before proceeding.",
        timestamp: '9:25 AM',
      }
    ]
  },
  {
    id: '2',
    user: {
      id: 'em',
      name: 'Elite Motors',
      avatar: 'EM',
      avatarColor: 'bg-blue-100 text-blue-600',
      isOnline: false,
    },
    lastMessage: "We've started the full service on your vehicle.",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: []
  },
  {
    id: '3',
    user: {
      id: 'qf',
      name: 'QuickFix Garage',
      avatar: 'QF',
      avatarColor: 'bg-blue-100 text-blue-600',
      isOnline: false,
    },
    lastMessage: 'The brake pads have been ordered and will arrive soon.',
    lastMessageTime: 'Dec 5',
    unreadCount: 0,
    messages: []
  }
];
