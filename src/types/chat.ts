export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'location';
  isRead: boolean;
  metadata?: {
    imageUrl?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    location?: {
      latitude: number;
      longitude: number;
      address?: string;
    };
  };
}

export interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string | null;
  participantRole: 'driver' | 'client' | 'support';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  tripId: string | null;
  status?: 'active' | 'archived' | 'blocked';
}

export interface ChatPreview {
  id: string;
  participantName: string;
  participantAvatar: string | null;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

export interface SendMessageRequest {
  chatId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'location';
  metadata?: Message['metadata'];
}

export interface CreateChatRequest {
  participantId: string;
  participantName: string;
  tripId?: string;
}

export interface ChatNotification {
  chatId: string;
  message: Message;
  senderName: string;
  senderAvatar: string | null;
}
