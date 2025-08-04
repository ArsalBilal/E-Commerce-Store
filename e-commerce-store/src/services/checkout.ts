import { stripeAxios } from './axiosInstance';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QZIf1H0Lgtkmy8yHk9h6KdFpgQKUJ3gIurrekLA64C3N2FxxsCe8BECraoctoiVOJQq5mMQUGZWwhnCRq7uiMbE00ayKvC0HP');

interface CheckoutItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail: string;
}

interface StripeResponse {
  id: string;
}

export async function handleCheckout(cartItems: CheckoutItem[]): Promise<void> {
  try {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const items = cartItems.map((item) => ({
      title: item.title,
      price: item.price, // Send as dollars - backend will convert to cents
      quantity: item.quantity,
      description: item.description,
      image: item.thumbnail,
    }));

    const response = await stripeAxios.post<StripeResponse>('/create-checkout-session', {
      items,
    });

    const sessionId = response.data.id;

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error('Stripe redirect error:', result.error.message);
    }
  } catch (error: any) {
    console.error('Checkout failed:', error?.response?.data || error.message);
  }
}
