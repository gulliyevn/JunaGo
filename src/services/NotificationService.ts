export interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  type: 'trip' | 'payment' | 'driver' | 'system';
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface PushNotificationPayload {
  title: string;
  message: string;
  data?: any;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  constructor() {
    this.initializeMockNotifications();
    this.startTimeBasedNotifications();
  }

  // Инициализация с моковыми уведомлениями
  private initializeMockNotifications() {
    const now = new Date();
    
    this.notifications = [
      {
        id: '1',
        title: 'Новое сообщение',
        message: 'Водитель Рашад: "Уже еду к вам, буду через 3 минуты"',
        time: new Date(now.getTime() - 2 * 60 * 1000), // 2 минуты назад
        type: 'driver',
        isRead: false,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Оплата прошла успешно',
        message: 'Списано 8.50 ₼ за поездку до Port Baku',
        time: new Date(now.getTime() - 15 * 60 * 1000), // 15 минут назад
        type: 'payment',
        isRead: false,
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Поездка завершена',
        message: 'Дочь успешно доставлена в школу №132',
        time: new Date(now.getTime() - 30 * 60 * 1000), // 30 минут назад
        type: 'trip',
        isRead: true,
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Обновление приложения',
        message: 'Доступна новая версия FixDrive с улучшениями',
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 часа назад
        type: 'system',
        isRead: true,
        priority: 'low'
      },
      {
        id: '5',
        title: 'Новый водитель в сети',
        message: 'Эльнур Мамедов теперь доступен в вашем районе',
        time: new Date(now.getTime() - 45 * 60 * 1000), // 45 минут назад
        type: 'driver',
        isRead: true,
        priority: 'low'
      }
    ];

    this.sortNotifications();
  }

  // Запуск системы уведомлений на основе времени
  private startTimeBasedNotifications() {
    // Проверяем каждую минуту на предстоящие поездки
    setInterval(() => {
      this.checkUpcomingTrips();
      this.generateRandomNotifications();
    }, 60000); // каждую минуту
  }

  // Проверка предстоящих поездок (за 15 минут до выезда)
  private checkUpcomingTrips() {
    const now = new Date();
    const in15Minutes = new Date(now.getTime() + 15 * 60 * 1000);
    
    // Моковые предстоящие поездки
    const upcomingTrips = [
      {
        memberId: 'daughter',
        memberName: 'Дочь',
        destination: 'Школа №132',
        scheduledTime: new Date(now.getTime() + 14 * 60 * 1000), // через 14 минут
        driverName: 'Эльнур Мамедов'
      },
      {
        memberId: 'wife',
        memberName: 'Жена',
        destination: 'Салон красоты',
        scheduledTime: new Date(now.getTime() + 16 * 60 * 1000), // через 16 минут
        driverName: 'Фарид Джафаров'
      }
    ];

    upcomingTrips.forEach(trip => {
      const timeDiff = trip.scheduledTime.getTime() - now.getTime();
      const minutesUntilTrip = Math.floor(timeDiff / (1000 * 60));

      // Если до поездки 15 минут или меньше, создаем уведомление
      if (minutesUntilTrip <= 15 && minutesUntilTrip > 0) {
        const existingNotification = this.notifications.find(
          n => n.message.includes(trip.memberName) && n.message.includes('готовится к выезду')
        );

        if (!existingNotification) {
          this.addNotification({
            title: 'Предстоящая поездка',
            message: `${trip.memberName} готовится к выезду в ${trip.destination} через ${minutesUntilTrip} мин`,
            type: 'trip',
            priority: 'high'
          });
        }
      }
    });
  }

  // Генерация случайных уведомлений для демонстрации
  private generateRandomNotifications() {
    const random = Math.random();
    
    // 5% шанс каждую минуту получить новое уведомление
    if (random < 0.05) {
      const randomNotifications = [
        {
          title: 'Новое сообщение',
          message: 'Водитель Орхан: "Задерживаюсь на 2 минуты из-за пробки"',
          type: 'driver' as const,
          priority: 'medium' as const
        },
        {
          title: 'Скидка на поездки',
          message: 'Получите 20% скидку на следующие 3 поездки!',
          type: 'system' as const,
          priority: 'low' as const
        },
        {
          title: 'Водитель прибыл',
          message: 'Самир Исмаилов ждет вас у подъезда',
          type: 'trip' as const,
          priority: 'high' as const
        },
        {
          title: 'Возврат средств',
          message: 'Возвращено 3.20 ₼ за отмененную поездку',
          type: 'payment' as const,
          priority: 'medium' as const
        }
      ];

      const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      this.addNotification(randomNotification);
    }
  }

  // Добавление нового уведомления
  addNotification(notificationData: Omit<Notification, 'id' | 'time' | 'isRead'>) {
    const notification: Notification = {
      id: Date.now().toString(),
      time: new Date(),
      isRead: false,
      ...notificationData
    };

    this.notifications.unshift(notification); // Добавляем в начало
    this.sortNotifications();
    this.notifyListeners();
  }

  // Сортировка уведомлений (непрочитанные сверху, затем по времени)
  private sortNotifications() {
    this.notifications.sort((a, b) => {
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1; // Непрочитанные сверху
      }
      return b.time.getTime() - a.time.getTime(); // Новые сверху
    });
  }

  // Получение всех уведомлений
  getNotifications(): Notification[] {
    return this.notifications;
  }

  // Получение количества непрочитанных уведомлений
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  // Отметить уведомление как прочитанное
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.sortNotifications();
      this.notifyListeners();
    }
  }

  // Отметить все уведомления как прочитанные
  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
    this.notifyListeners();
  }

  // Удаление уведомления
  removeNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notifyListeners();
  }

  // Подписка на изменения уведомлений
  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Уведомление всех подписчиков об изменениях
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Форматирование времени для отображения
  formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return 'Только что';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} мин назад`;
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`;
    } else if (diffDays === 1) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

}

// Синглтон для использования во всем приложении
export const notificationService = new NotificationService();
export default NotificationService;
