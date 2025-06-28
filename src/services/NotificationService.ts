export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: any;
  timestamp: Date;
  isRead: boolean;
}

export type NotificationType = 'order' | 'chat' | 'payment' | 'system';

export interface PushNotificationPayload {
  title: string;
  message: string;
  data?: any;
}

export class NotificationService {
  static async getNotifications(userId: string): Promise<Notification[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Новый заказ',
            message: 'У вас есть новый заказ от клиента',
            type: 'order',
            data: { orderId: '123' },
            timestamp: new Date(Date.now() - 3600000),
            isRead: false,
          },
          {
            id: '2',
            title: 'Сообщение в чате',
            message: 'Новое сообщение от водителя',
            type: 'chat',
            data: { chatId: '456' },
            timestamp: new Date(Date.now() - 1800000),
            isRead: true,
          },
          {
            id: '3',
            title: 'Платеж успешен',
            message: 'Ваш платеж на сумму 750₽ успешно обработан',
            type: 'payment',
            data: { amount: 750 },
            timestamp: new Date(Date.now() - 900000),
            isRead: false,
          },
        ]);
      }, 500);
    });
  }

  static async markAsRead(notificationId: string): Promise<void> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  static async markAllAsRead(userId: string): Promise<void> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  static async deleteNotification(notificationId: string): Promise<void> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  static async sendPushNotification(userId: string, payload: PushNotificationPayload): Promise<void> {
    // TODO: заменить на реальный API запрос для отправки push-уведомлений
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Push notification sent:', { userId, ...payload });
        resolve();
      }, 300);
    });
  }

  static async registerForPushNotifications(userId: string, deviceToken: string): Promise<void> {
    // TODO: заменить на реальный API запрос для регистрации устройства
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Device registered for push notifications:', { userId, deviceToken });
        resolve();
      }, 500);
    });
  }

  static async unregisterFromPushNotifications(userId: string): Promise<void> {
    // TODO: заменить на реальный API запрос для отмены регистрации устройства
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Device unregistered from push notifications:', { userId });
        resolve();
      }, 300);
    });
  }

  static async getUnreadCount(userId: string): Promise<number> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2); // Мок количество непрочитанных уведомлений
      }, 200);
    });
  }
}

export default NotificationService;
