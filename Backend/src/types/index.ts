// Environment Variables Interface
export interface ProcessEnv {
  STRIPE_SECRET_KEY: string;
  CLIENT_URL: string;
  PORT?: string;
  NODE_ENV?: 'development' | 'production' | 'test';
}

// Cart Item Interface
export interface CartItem {
  id?: string;
  title: string;
  price: number | string;
  quantity: number | string;
  description?: string;
  image?: string;
  category?: string;
}

// Checkout Request Interface
export interface CheckoutRequestBody {
  items: CartItem[];
}

// API Response Interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Stripe Session Response
export interface StripeSessionResponse {
  id: string;
}

// Error Response
export interface ErrorResponse {
  error: string;
  details?: string;
}

// Express Request with Typed Body
declare global {
  namespace Express {
    interface Request {
      body: CheckoutRequestBody;
    }
  }
}
