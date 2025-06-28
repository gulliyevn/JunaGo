import { Driver } from '../types/user';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface DriverLocation extends Location {
  driver: Driver;
  isAvailable: boolean;
  rating: number;
}

export class MapService {
  static async getCurrentLocation(): Promise<Location> {
    // TODO: заменить на реальную геолокацию
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latitude: 55.7558,
          longitude: 37.6176,
          address: 'Москва, Россия',
        });
      }, 1000);
    });
  }

  static async getNearbyDrivers(location: Location, radius: number = 5000): Promise<DriverLocation[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            latitude: 55.7558 + 0.001,
            longitude: 37.6176 + 0.001,
            address: 'Москва, ул. Тверская',
            driver: {
              id: '1',
              name: 'Алексей',
              surname: 'Петров',
              email: 'alex@example.com',
              address: 'Москва',
              role: 'driver',
              car: 'Toyota Camry',
              carInfo: 'A123BC, белый',
              clientsPerDay: 3,
            },
            isAvailable: true,
            rating: 4.8,
          },
          {
            latitude: 55.7558 - 0.001,
            longitude: 37.6176 - 0.001,
            address: 'Москва, ул. Арбат',
            driver: {
              id: '2',
              name: 'Мария',
              surname: 'Иванова',
              email: 'maria@example.com',
              address: 'Москва',
              role: 'driver',
              car: 'Honda Civic',
              carInfo: 'B456DE, серебристый',
              clientsPerDay: 2,
            },
            isAvailable: true,
            rating: 4.9,
          },
        ]);
      }, 1000);
    });
  }

  static async getRoute(from: Location, to: Location): Promise<Location[]> {
    // TODO: заменить на реальный API маршрутов
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          from,
          {
            latitude: (from.latitude + to.latitude) / 2,
            longitude: (from.longitude + to.longitude) / 2,
          },
          to,
        ]);
      }, 500);
    });
  }

  static async geocodeAddress(address: string): Promise<Location> {
    // TODO: заменить на реальный геокодинг
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latitude: 55.7558,
          longitude: 37.6176,
          address,
        });
      }, 1000);
    });
  }
}

export default MapService;
