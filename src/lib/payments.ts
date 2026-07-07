import {
  getPlayerCardCheckoutUrl,
  KATAHERO_PURCHASE_URL,
  PLAYER_CARD_PRICE,
} from "@/lib/card-view";

/** Portale clienti Stripe — fatture, metodo di pagamento, abbonamento. */
const STRIPE_CUSTOMER_PORTAL_DEFAULT =
  "https://billing.stripe.com/p/login/aFacN55n7eGn0lf45e4ZG00";

export function getStripeCustomerPortalUrl(): string {
  return (
    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL?.trim() ||
    STRIPE_CUSTOMER_PORTAL_DEFAULT
  );
}

export function getPlayerCardPurchaseUrl(): string {
  return getPlayerCardCheckoutUrl();
}

export const PAYMENTS = {
  processor: "Stripe",
  processorPrivacyUrl: "https://stripe.com/it/privacy",
  playerCardPrice: PLAYER_CARD_PRICE,
  packagesUrl: `${KATAHERO_PURCHASE_URL}/pacchetti`,
} as const;
