import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createCheckoutSession from './routes/createCheckoutSession.js';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Stripe backend is running');
});

app.use('/create-checkout-session', createCheckoutSession);

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
