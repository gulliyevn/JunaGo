import { Driver, Client, UserRole } from '../types/user';

export type RegisterPayload =
  | (Omit<Driver, 'id'> & { password: string })
  | (Omit<Client, 'id'> & { password: string });

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
}

export default AuthService;
