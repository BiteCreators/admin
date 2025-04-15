import { PaymentMethod } from '@/common/__generated-types__/graphql'

export const formatPaymentMethod = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.Paypal:
      return 'PayPal'
    case PaymentMethod.Stripe:
      return 'Stripe'
    case PaymentMethod.CreditCard:
      return 'Credit card'
  }
}
