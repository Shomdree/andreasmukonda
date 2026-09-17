export type PaymentIntent = {
  amountLabel: string;
  currency: string;
  reference: string;
};

export interface PaymentProvider {
  readonly id: string;
  createCheckout(intent: PaymentIntent): Promise<{ url: string } | { deferred: true }>;
}

export class DeferredPaymentProvider implements PaymentProvider {
  readonly id = "deferred-quote";
  async createCheckout(_intent: PaymentIntent) {
    return { deferred: true as const };
  }
}

export const paymentProvider: PaymentProvider = new DeferredPaymentProvider();
