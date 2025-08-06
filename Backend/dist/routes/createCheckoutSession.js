import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();
const router = express.Router();
// Validate environment variable
if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY is missing in .env!");
    throw new Error("STRIPE_SECRET_KEY is required");
}
if (!process.env.CLIENT_URL) {
    console.error("❌ CLIENT_URL is missing in .env!");
    throw new Error("CLIENT_URL is required");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
});
router.post("/", async (req, res) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            res.status(400).json({ error: "No items provided in the request." });
            return;
        }
        console.log(" Received items:", items);
        console.log("Price in Dollars:", items.map(item => item.price));
        const line_items = items.map((item, index) => {
            const price = parseFloat(item.price.toString());
            const quantity = parseInt(item.quantity?.toString() || '1');
            const title = item.title || `Product ${index + 1}`;
            const description = item.description || '';
            const image = item.image || "";
            if (isNaN(price) || price <= 0) {
                throw new Error(`Invalid price for item at index ${index}: ${item.price}`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: title,
                        description: description,
                        images: [image],
                    },
                    unit_amount: Math.round(price * 100), // Convert dollars to cents for Stripe
                },
                quantity,
            };
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
        console.log("Stripe session created:", session.id);
        res.status(200).json({ id: session.id });
        return;
    }
    catch (error) {
        console.error(' Error creating checkout session:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
        return;
    }
});
export default router;
//# sourceMappingURL=createCheckoutSession.js.map