export interface ProcessEnv {
    STRIPE_SECRET_KEY: string;
    CLIENT_URL: string;
    PORT?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
}
export interface CartItem {
    id?: string;
    title: string;
    price: number | string;
    quantity: number | string;
    description?: string;
    image?: string;
    category?: string;
}
export interface CheckoutRequestBody {
    items: CartItem[];
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface StripeSessionResponse {
    id: string;
}
export interface ErrorResponse {
    error: string;
    details?: string;
}
declare global {
    namespace Express {
        interface Request {
            body: CheckoutRequestBody;
        }
    }
}
//# sourceMappingURL=index.d.ts.map