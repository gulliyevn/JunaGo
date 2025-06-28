import { Driver, Client, UserRole } from '../types/user';

export type RegisterPayload =
  | (Omit<Driver, 'id'> & { password: string })
  | (Omit<Client, 'id'> & { password: string });

export type LoginPayload = {
  email: string;
  password: string;
};

export class AuthService {
  static async register(payload: RegisterPayload): Promise<Driver | Client> {
    // TODO: заменить на реальный запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (payload.role === 'driver') {
          resolve({ ...(payload as any), id: Date.now().toString() });
        } else {
          resolve({ ...(payload as any), id: Date.now().toString() });
        }
      }, 1000);
    });
  }

  static async login(payload: LoginPayload): Promise<Driver | Client> {
    // TODO: заменить на реальный запрос к API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Мок логин - всегда возвращает клиента
        if (payload.email && payload.password) {
          resolve({
            id: '1',
            name: 'Тестовый',
            surname: 'Клиент',
            email: payload.email,
            address: 'Москва',
            role: 'client' as UserRole,
          } as Client);
        } else {
          reject(new Error('Неверные данные'));
        }
      }, 1000);
    });
  }

  static async logout(): Promise<void> {
    // TODO: заменить на реальный запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}

export default AuthService;
