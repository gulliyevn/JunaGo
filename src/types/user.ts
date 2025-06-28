export type UserRole = 'client' | 'driver';

export interface BaseUser {
  id?: string;
  name: string;
  surname: string;
  email: string;
  address: string;
  role: UserRole;
}

export interface Driver extends BaseUser {
  car: string;
  carInfo: string;
  clientsPerDay: number;
}

export interface Client extends BaseUser {
  // можно добавить поля для клиента
}
