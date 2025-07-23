import { stripeAxios } from './axiosInstance';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QZIf1H0Lgtkmy8yHk9h6KdFpgQKUJ3gIurrekLA64C3N2FxxsCe8BECraoctoiVOJQq5mMQUGZWwhnCRq7uiMbE00ayKvC0HP');

export async function handleCheckout(cartItems) {
  try {
    const stripe = await stripePromise;

    
    const items = cartItems.map((item) => ({
      title: item.title,                                 
      price: Math.round(item.price*100),               
      quantity: item.quantity,
      description: item.description,
      image:item.thumbnail,
    }));

    
    const response = await stripeAxios.post('/create-checkout-session', {
      items,
    });

    const sessionId = response.data.id;

    
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error('Stripe redirect error:', result.error.message);
    }
  } catch (error) {
    console.error('Checkout failed:', error?.response?.data || error.message);
  }
}

