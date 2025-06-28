export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  clientSecret: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  planId: string;
  planName: string;
  amount: number;
}

export interface PaymentPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  duration: number; // в днях
}

export class StripeService {
  static async createPaymentIntent(amount: number, currency: string = 'rub'): Promise<PaymentIntent> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `pi_${Date.now()}`,
          amount,
          currency,
          status: 'requires_payment_method',
          clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 1000);
    });
  }

  static async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: paymentIntentId,
          amount: 750,
          currency: 'rub',
          status: 'succeeded',
          clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 1500);
    });
  }

  static async getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pm_1234567890',
            type: 'card',
            last4: '4242',
            brand: 'visa',
            expMonth: 12,
            expYear: 2025,
          },
          {
            id: 'pm_0987654321',
            type: 'card',
            last4: '5555',
            brand: 'mastercard',
            expMonth: 8,
            expYear: 2024,
          },
        ]);
      }, 500);
    });
  }

  static async addPaymentMethod(customerId: string, paymentMethodId: string): Promise<PaymentMethod> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: paymentMethodId,
          type: 'card',
          last4: '1234',
          brand: 'visa',
          expMonth: 12,
          expYear: 2025,
        });
      }, 800);
    });
  }

  static async removePaymentMethod(paymentMethodId: string): Promise<void> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  static async createSubscription(customerId: string, priceId: string): Promise<Subscription> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `sub_${Date.now()}`,
          status: 'active',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
          planId: priceId,
          planName: 'Премиум подписка',
          amount: 2990,
        });
      }, 1000);
    });
  }

  static async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: subscriptionId,
          status: 'canceled',
          currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          planId: 'price_premium',
          planName: 'Премиум подписка',
          amount: 2990,
        });
      }, 800);
    });
  }

  static async getSubscriptions(customerId: string): Promise<Subscription[]> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'sub_1234567890',
            status: 'active',
            currentPeriodStart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            currentPeriodEnd: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
            planId: 'price_premium',
            planName: 'Премиум подписка',
            amount: 2990,
          },
        ]);
      }, 500);
    });
  }

  static async getPaymentPackages(): Promise<PaymentPackage[]> {
    // TODO: заменить на реальный API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'basic',
            name: 'Базовый',
            description: 'Доступ к основным функциям',
            price: 990,
            currency: 'rub',
            features: ['Неограниченные поездки', 'Поддержка 24/7'],
            duration: 30,
          },
          {
            id: 'premium',
            name: 'Премиум',
            description: 'Расширенные возможности',
            price: 2990,
            currency: 'rub',
            features: ['Приоритетное обслуживание', 'Скидки на поездки', 'Премиум поддержка'],
            duration: 30,
          },
          {
            id: 'business',
            name: 'Бизнес',
            description: 'Для корпоративных клиентов',
            price: 5990,
            currency: 'rub',
            features: ['Все функции Премиум', 'Корпоративная отчетность', 'Выделенный менеджер'],
            duration: 30,
          },
        ]);
      }, 500);
    });
  }

  static async createCustomer(email: string, name: string): Promise<string> {
    // TODO: заменить на реальный Stripe API запрос
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`cus_${Date.now()}`);
      }, 500);
    });
  }
}

export default StripeService;
