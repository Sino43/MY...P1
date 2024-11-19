const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('your-stripe-secret-key');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/donate', async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      description: 'GreenFuture Donation',
      source: token.id,
    });
    res.status(200).send({ success: true, charge });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
