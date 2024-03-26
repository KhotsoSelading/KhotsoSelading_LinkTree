const stripe = require("stripe")(process.env.STRIPE_KEY);

const YOUR_DOMAIN = process.env.DOMAIN;

const productLookup = {
  oneCoffee: process.env.ONE_COFFEE,
  twoCoffees: process.env.TWO_COFFEES,
  fourCoffees: process.env.FOUR_COFFEES,
};

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  const productCode = data.productCode;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: productLookup[productCode],
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });

  res.send({ sessionId: session.id });
}
