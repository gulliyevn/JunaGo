import * as Location from 'expo-location';
import { Driver } from '../types/user';

export interface MapLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface DriverLocation extends MapLocation {
  driver: Driver;
  isAvailable: boolean;
  rating: number;
}

export class MapService {
  static async getCurrentLocation(): Promise<MapLocation> {
    try {
      // Запрашиваем разрешение на геолокацию
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('Разрешение на геолокацию не предоставлено');
      }

      // Получаем текущую локацию
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      // Получаем адрес по координатам
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const address = addressResponse[0] 
        ? `${addressResponse[0].street}, ${addressResponse[0].city}`
        : 'Неизвестный адрес';

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address,
      };
    } catch (error) {
      console.error('Ошибка получения локации:', error);
      // Возвращаем дефолтную локацию в случае ошибки
      return {
        latitude: 55.7558,
        longitude: 37.6176,
        address: 'Москва, Россия',
      };
    }
  }

  static async getNearbyDrivers(location: MapLocation, radius: number = 5000): Promise<DriverLocation[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            latitude: location.latitude + 0.001,
            longitude: location.longitude + 0.001,
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
            latitude: location.latitude - 0.001,
            longitude: location.longitude - 0.001,
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
          {
            latitude: location.latitude + 0.002,
            longitude: location.longitude - 0.002,
            address: 'Москва, ул. Покровка',
            driver: {
              id: '3',
              name: 'Дмитрий',
              surname: 'Сидоров',
              email: 'dmitry@example.com',
              address: 'Москва',
              role: 'driver',
              car: 'BMW X5',
              carInfo: 'C789FG, черный',
              clientsPerDay: 4,
            },
            isAvailable: false,
            rating: 4.7,
          },
        ]);
      }, 1000);
    });
  }

  static async getRoute(from: MapLocation, to: MapLocation): Promise<MapLocation[]> {
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

  static async geocodeAddress(address: string): Promise<MapLocation> {
    try {
      const geocodeResult = await Location.geocodeAsync(address);
      
      if (geocodeResult.length > 0) {
        const { latitude, longitude } = geocodeResult[0];
        return {
          latitude,
          longitude,
          address,
        };
      } else {
        throw new Error('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка геокодинга:', error);
      // Возвращаем дефолтную локацию в случае ошибки
      return {
        latitude: 55.7558,
        longitude: 37.6176,
        address,
      };
    }
  }

  static async watchLocation(callback: (location: MapLocation) => void): Promise<() => void> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('Разрешение на геолокацию не предоставлено');
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 50,
        },
        (location) => {
          callback({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return () => subscription.remove();
    } catch (error) {
      console.error('Ошибка отслеживания локации:', error);
      return () => {};
    }
  }
}

export default MapService;
