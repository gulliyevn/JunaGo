// Централизованная конфигурация окружения с валидацией
interface EnvironmentConfig {
  API_URL: string;
  NODE_ENV: string;
  VERSION: string;
  DEBUG: boolean;
  SENTRY_DSN?: string;
  ANALYTICS_ID?: string;
}

// Валидация обязательных переменных окружения
const validateEnv = (): EnvironmentConfig => {
  const requiredVars = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    REACT_APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0'
  };

  // Проверяем обязательные переменные
  if (!requiredVars.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL is required but not defined');
  }

  // Валидируем формат API URL
  try {
    new URL(requiredVars.REACT_APP_API_URL);
  } catch {
    throw new Error('REACT_APP_API_URL must be a valid URL');
  }

  return {
    API_URL: requiredVars.REACT_APP_API_URL,
    NODE_ENV: requiredVars.NODE_ENV,
    VERSION: requiredVars.REACT_APP_VERSION,
    DEBUG: requiredVars.NODE_ENV === 'development',
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    ANALYTICS_ID: process.env.REACT_APP_GA_ID
  };
};

export const ENV = validateEnv();

// Логгер для production с фильтрацией
export const logger = {
  error: (message: string, ...args: any[]) => {
    console.error(message, ...args);
    // В production отправляем в Sentry
    if (ENV.NODE_ENV === 'production' && ENV.SENTRY_DSN) {
      // Интеграция с Sentry будет добавлена
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (ENV.DEBUG) console.warn(message, ...args);
  },
  info: (message: string, ...args: any[]) => {
    if (ENV.DEBUG) console.info(message, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (ENV.DEBUG) console.log(message, ...args);
  }
}; 