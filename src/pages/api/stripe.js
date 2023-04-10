import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { items } = req.body;
    const body = JSON.parse(req.body);

    try {
      // Create a session
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        allow_promotion_codes: true,
        shipping_options: [{ shipping_rate: "shr_1Ms2I1SILILiU8ugtwjzKSq6" }],
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        line_items: body.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.Title,
                images: [item.Image.data.attributes.formats.thumbnail.url],
              },

              unit_amount: item.Price * 100,
            },
            quantity: "1",
          };
        }),

        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
