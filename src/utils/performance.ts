import React from 'react';
import { ENV } from '../config/environment';

// Web Vitals мониторинг
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Performance Observer для мониторинга
class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();

  // Измерение времени выполнения функций
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.metrics.set(name, duration);
      
      if (ENV.DEBUG) {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.metrics.set(`${name}_error`, duration);
      throw error;
    }
  }

  // Измерение асинхронных операций
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.metrics.set(name, duration);
      
      if (ENV.DEBUG) {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.metrics.set(`${name}_error`, duration);
      throw error;
    }
  }

  // Мониторинг загрузки ресурсов
  observeResourceLoading() {
    if (!window.PerformanceObserver) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Предупреждения о медленных ресурсах
          if (resource.duration > 1000) {
            console.warn(`🐌 Slow resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
          }
          
          // Отслеживание больших ресурсов
          if (resource.transferSize && resource.transferSize > 512 * 1024) {
            console.warn(`📦 Large resource: ${resource.name} (${(resource.transferSize / 1024).toFixed(2)}KB)`);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  // Мониторинг Long Tasks
  observeLongTasks() {
    if (!window.PerformanceObserver) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn(`🐢 Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
      }
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // longtask API не поддерживается в некоторых браузерах
    }
  }

  // Получение собранных метрик
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  // Отправка метрик (в production в аналитику)
  reportMetrics() {
    const metrics = this.getMetrics();
    
    if (ENV.NODE_ENV === 'production' && ENV.ANALYTICS_ID) {
      // TODO: Интеграция с Google Analytics или другой системой
      console.log('📊 Performance metrics:', metrics);
    }
    
    return metrics;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Инициализация мониторинга
export const initPerformanceMonitoring = () => {
  // Web Vitals
  reportWebVitals((metric) => {
    if (ENV.DEBUG) {
      console.log('📈 Web Vital:', metric);
    }
    
    // В production отправляем в аналитику
    if (ENV.NODE_ENV === 'production') {
      // TODO: Отправка в Google Analytics
    }
  });

  // Resource и Long Task мониторинг
  performanceMonitor.observeResourceLoading();
  performanceMonitor.observeLongTasks();

  // Memory usage мониторинг (если доступен)
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
        console.warn('🧠 High memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
        });
      }
    }, 30000); // Каждые 30 секунд
  }
};

// HOC для мониторинга производительности компонентов
export const withPerformanceMonitoring = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo<P>((props: P) => {
    const renderStart = React.useRef<number>();
    
    React.useEffect(() => {
      renderStart.current = performance.now();
    }, []);

    React.useLayoutEffect(() => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current;
        if (renderTime > 16) { // Больше одного фрейма (60fps)
          console.warn(`⚡ Slow render: ${componentName} (${renderTime.toFixed(2)}ms)`);
        }
      }
    }, [componentName]);

    return React.createElement(WrappedComponent, props);
  });
}; 