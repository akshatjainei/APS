require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const fs = require('fs');

async function createProductAndPrice() {
  const product = await stripe.products.create({
    name: 'RVCE Parking Lot',
  });

  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: 0,
    product: product.id,
  });

  const data = {
    productId: product.id,
    priceId: price.id,
  };

  fs.writeFileSync('stripe_data.json', JSON.stringify(data, null, 2));
  console.log('Product and price created and stored:', data);
}

createProductAndPrice();
  