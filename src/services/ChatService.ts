import { Driver, Client } from '../types/user';
import { UserRole } from '../types/user';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'driver';
  text: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  client: Client;
  driver: Driver;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface SendMessagePayload {
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'driver';
  text: string;
}

export class ChatService {
  static async getChats(userId: string, userRole: 'client' | 'driver'): Promise<Chat[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockChats: Chat[] = [
          {
            id: '1',
            client: {
              id: '1',
              name: 'Иван',
              surname: 'Сидоров',
              email: 'ivan@example.com',
              address: 'Москва',
              role: UserRole.CLIENT,
            },
            driver: {
              id: '2',
              name: 'Алексей',
              surname: 'Петров',
              email: 'alex@example.com',
              address: 'Москва',
              role: UserRole.DRIVER,
              car: 'Toyota Camry',
              carInfo: 'A123BC, белый',
              clientsPerDay: 3,
            },
            messages: [
              {
                id: '1',
                senderId: '1',
                senderName: 'Иван Сидоров',
                senderRole: UserRole.CLIENT,
                text: 'Здравствуйте! Когда приедете?',
                timestamp: new Date(Date.now() - 3600000),
                isRead: true,
              },
              {
                id: '2',
                senderId: '2',
                senderName: 'Алексей Петров',
                senderRole: UserRole.DRIVER,
                text: 'Добрый день! Буду через 10 минут',
                timestamp: new Date(Date.now() - 1800000),
                isRead: true,
              },
            ],
            lastMessage: {
              id: '2',
              senderId: '2',
              senderName: 'Алексей Петров',
              senderRole: UserRole.DRIVER,
              text: 'Добрый день! Буду через 10 минут',
              timestamp: new Date(Date.now() - 1800000),
              isRead: true,
            },
            unreadCount: 0,
          },
        ];

        resolve(mockChats);
      }, 500);
    });
  }

  static async getChatMessages(chatId: string): Promise<Message[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            senderId: '1',
            senderName: 'Иван Сидоров',
            senderRole: UserRole.CLIENT,
            text: 'Здравствуйте! Когда приедете?',
            timestamp: new Date(Date.now() - 3600000),
            isRead: true,
          },
          {
            id: '2',
            senderId: '2',
            senderName: 'Алексей Петров',
            senderRole: UserRole.DRIVER,
            text: 'Добрый день! Буду через 10 минут',
            timestamp: new Date(Date.now() - 1800000),
            isRead: true,
          },
          {
            id: '3',
            senderId: '1',
            senderName: 'Иван Сидоров',
            senderRole: UserRole.CLIENT,
            text: 'Отлично, жду!',
            timestamp: new Date(Date.now() - 900000),
            isRead: false,
          },
        ]);
      }, 500);
    });
  }

  static async sendMessage(payload: SendMessagePayload): Promise<Message> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        const message: Message = {
          id: Date.now().toString(),
          senderId: payload.senderId,
          senderName: payload.senderName,
          senderRole: payload.senderRole,
          text: payload.text,
          timestamp: new Date(),
          isRead: false,
        };
        resolve(message);
      }, 300);
    });
  }

  static async markAsRead(chatId: string, messageIds: string[]): Promise<void> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  static async createChat(clientId: string, driverId: string): Promise<Chat> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          client: {
            id: clientId,
            name: 'Тестовый',
            surname: 'Клиент',
            email: 'test@example.com',
            address: 'Москва',
            role: UserRole.CLIENT,
          },
          driver: {
            id: driverId,
            name: 'Тестовый',
            surname: 'Водитель',
            email: 'driver@example.com',
            address: 'Москва',
            role: UserRole.DRIVER,
            car: 'Toyota Camry',
            carInfo: 'A123BC, белый',
            clientsPerDay: 3,
          },
          messages: [],
          unreadCount: 0,
        });
      }, 500);
    });
  }
}

export default ChatService;
