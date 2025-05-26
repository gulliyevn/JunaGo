import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../../config/environment';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы следующий рендер показал fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку
    logger.error('React Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // В production отправляем в Sentry/мониторинг
    if (process.env.NODE_ENV === 'production') {
      // TODO: Интеграция с Sentry
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Пользовательский fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>⚠️</div>
            <h1>Что-то пошло не так</h1>
            <p>Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.</p>
            
            <div className={styles.errorActions}>
              <button 
                onClick={this.handleReload}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Обновить страницу
              </button>
              <button 
                onClick={this.handleGoHome}
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                На главную
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Детали ошибки (dev mode)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 