import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
const router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is missing in .env!");
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

router.post("/", async (req, res) => {
  try {
    const items = req.body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided in the request." });
    }

    console.log(" Received items:", items);
    console.log("Price in Dollars:",items.price*100);

    const line_items = items.map((item, index) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity) || 1;
      const title = item.title || `Product ${index + 1}`;
      const description =item.description ;
      const image = item.image || ""; 

      if (isNaN(price) || price <= 0) {
        throw new Error(`Invalid price for item at index ${index}: ${item.price}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
            description:description,  
            images: [image], 
          },
          unit_amount: Math.round(price* 100), // Stripe expects amount in cents
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

  } catch (error) {
    console.error(' Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;