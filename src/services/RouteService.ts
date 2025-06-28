import TrafficService from './TrafficService';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface RouteSegment {
  coordinates: Coordinate[];
  trafficLevel: 'free' | 'low' | 'medium' | 'high' | 'heavy';
  duration: number;
  distance: number;
}

interface RouteResponse {
  coordinates: Coordinate[];
  duration: number; // в секундах
  distance: number; // в метрах
  segments: RouteSegment[];
}

class RouteService {
  private static readonly API_KEY = '5b3ce3597851110001cf624867388026e77848d78abfc822a3bb3fcf';
  private static readonly BASE_URL = 'https://api.openrouteservice.org/v2';

  // Получение маршрута между двумя точками
  static async getRoute(start: Coordinate, end: Coordinate): Promise<RouteResponse> {
    try {
      const url = `${this.BASE_URL}/directions/driving-car`;
      const body = {
        coordinates: [[start.longitude, start.latitude], [end.longitude, end.latitude]],
        format: 'json',
        instructions: false,
      };

      console.log('Запрос маршрута:', { start, end, url });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('Статус ответа:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка API:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('Полный ответ API получен, есть routes:', !!data.routes);
      
      if (!data.routes || data.routes.length === 0) {
        console.log('Структура ответа:', Object.keys(data));
        throw new Error('Маршрут не найден');
      }

      const route = data.routes[0];
      console.log('Маршрут найден, дистанция:', route.summary.distance, 'время:', route.summary.duration);
      
      // Декодируем геометрию маршрута
      const coordinates = this.decodePolyline(route.geometry);
      console.log('Координат в маршруте:', coordinates.length);

      // Генерируем сегменты с реальными пробками
      const segments = this.generateTrafficSegmentsSync(coordinates, route.summary.duration);

      return {
        coordinates,
        duration: route.summary.duration,
        distance: route.summary.distance,
        segments,
      };
    } catch (error) {
      console.error('Ошибка получения маршрута:', error);
      throw error;
    }
  }

  // Генерация сегментов с полным покрытием маршрута
  private static generateTrafficSegmentsSync(coordinates: Coordinate[], totalDuration: number): RouteSegment[] {
    const segments: RouteSegment[] = [];
    const segmentCount = Math.min(Math.max(Math.floor(coordinates.length / 12), 4), 10);
    
    for (let i = 0; i < segmentCount; i++) {
      const startIdx = Math.floor((i / segmentCount) * coordinates.length);
      const endIdx = Math.floor(((i + 1) / segmentCount) * coordinates.length);
      
      // Убеждаемся что последний сегмент доходит до конца
      const actualEndIdx = i === segmentCount - 1 ? coordinates.length - 1 : endIdx;
      
      // Если startIdx >= actualEndIdx, делаем минимальный сегмент
      const segmentCoords = startIdx >= actualEndIdx 
        ? [coordinates[startIdx], coordinates[Math.min(startIdx + 1, coordinates.length - 1)]]
        : coordinates.slice(startIdx, actualEndIdx + 1);
      
      // Умная симуляция пробок с учетом времени и локации
      const trafficLevel = TrafficService.getTrafficLevel(
        segmentCoords[0], 
        new Date(),
        i / segmentCount // позиция в маршруте (0-1)
      );
      
      segments.push({
        coordinates: segmentCoords,
        trafficLevel,
        duration: Math.round((totalDuration / segmentCount) * this.getTrafficMultiplier(trafficLevel)),
        distance: this.calculateDistance(segmentCoords[0], segmentCoords[segmentCoords.length - 1]),
      });
    }

    return segments;
  }

  // Мультипликатор времени в зависимости от пробок
  private static getTrafficMultiplier(trafficLevel: 'free' | 'low' | 'medium' | 'high' | 'heavy'): number {
    switch (trafficLevel) {
      case 'free': return 0.8;   // На 20% быстрее
      case 'low': return 1.0;    // Нормальное время
      case 'medium': return 1.3; // На 30% медленнее
      case 'high': return 1.7;   // На 70% медленнее
      case 'heavy': return 2.2;  // В 2.2 раза медленнее
      default: return 1.0;
    }
  }

  // Получение альтернативных маршрутов (самый быстрый)
  static async getFastestRoute(start: Coordinate, end: Coordinate): Promise<RouteResponse> {
    try {
      // Запрашиваем несколько альтернативных маршрутов
      const url = `${this.BASE_URL}/directions/driving-car`;
      const body = {
        coordinates: [[start.longitude, start.latitude], [end.longitude, end.latitude]],
        format: 'json',
        instructions: false,
        alternative_routes: {
          target_count: 3,
          weight_factor: 1.4,
          share_factor: 0.6
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        // Fallback на обычный маршрут
        return this.getRoute(start, end);
      }

      const data = await response.json();
      
      if (!data.routes || data.routes.length === 0) {
        return this.getRoute(start, end);
      }

      // Анализируем все маршруты с учетом пробок
      let fastestRoute = null;
      let fastestTime = Infinity;

      for (const route of data.routes) {
        const coordinates = this.decodePolyline(route.geometry);
        const segments = this.generateTrafficSegmentsSync(coordinates, route.summary.duration);
        
        // Считаем реальное время с учетом пробок
        const realTime = segments.reduce((total, segment) => total + segment.duration, 0);
        
        if (realTime < fastestTime) {
          fastestTime = realTime;
          fastestRoute = {
            coordinates,
            duration: realTime,
            distance: route.summary.distance,
            segments,
          };
        }
      }

      return fastestRoute || this.getRoute(start, end);
    } catch (error) {
      console.error('Ошибка получения быстрейшего маршрута:', error);
      return this.getRoute(start, end);
    }
  }

  // Вычисление среднего уровня пробок для сегмента
  private static calculateAverageTrafficLevel(trafficData: any[]): 'free' | 'low' | 'medium' | 'high' | 'heavy' {
    if (!trafficData || trafficData.length === 0) return 'medium';
    
    const levels = { free: 0, low: 1, medium: 2, high: 3, heavy: 4 };
    const reverseLevels = ['free', 'low', 'medium', 'high', 'heavy'] as const;
    
    const avgLevel = trafficData.reduce((sum, data) => {
      return sum + levels[data.level];
    }, 0) / trafficData.length;
    
    return reverseLevels[Math.round(avgLevel)];
  }

  // Расчет расстояния между двумя точками (формула гаверсинуса)
  private static calculateDistance(point1: Coordinate, point2: Coordinate): number {
    const R = 6371000; // Радиус Земли в метрах
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Геокодирование - получение координат по адресу
  static async geocodeAddress(address: string): Promise<Coordinate | null> {
    try {
      const url = `${this.BASE_URL}/geocoding/search?api_key=${this.API_KEY}&text=${encodeURIComponent(address + ', Baku, Azerbaijan')}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates;
        return {
          longitude: coords[0],
          latitude: coords[1],
        };
      }
      return null;
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      return null;
    }
  }

  // Обратное геокодирование - получение адреса по координатам
  static async reverseGeocode(coordinate: Coordinate): Promise<string | null> {
    try {
      const url = `${this.BASE_URL}/geocoding/reverse?api_key=${this.API_KEY}&point.lon=${coordinate.longitude}&point.lat=${coordinate.latitude}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].properties.label;
      }
      return null;
    } catch (error) {
      console.error('Ошибка обратного геокодирования:', error);
      return null;
    }
  }

  // Декодирование polyline геометрии
  private static decodePolyline(encoded: string): Coordinate[] {
    const coordinates: Coordinate[] = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b;
      let shift = 0;
      let result = 0;
      
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      
      const deltaLat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;
      
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      
      const deltaLng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lng += deltaLng;

      coordinates.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return coordinates;
  }
}

export default RouteService;
export type { Coordinate, RouteSegment, RouteResponse }; 