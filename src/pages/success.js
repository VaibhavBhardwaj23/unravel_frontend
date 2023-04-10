import { useRouter } from "next/router";
import React from "react";
import { Address, Bottom, SuccessPage } from "@/styles/SuccessStyle";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    { expand: ["line_items"] }
  );
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  console.log(order);

  return (
    <SuccessPage>
      <div>
        <h1>Thank you for shopping</h1>
        <h2>A confirmation E-mail has been sent to you</h2>
        <h2>{order.customer_details.email}</h2>
        <Address>
          <h3>Address :</h3>
          <h2>
            {order.customer_details.address.line1},
            {order.customer_details.address.city},
            {order.customer_details.address.country}
          </h2>
        </Address>
        <div>
          <h3>Products</h3>
          <h2>
            {order.line_items.data.map((items) => {
              return (
                <div key={items.id}>
                  <p>Product :{items.description}</p>
                  <p>Quantity :{items.quantity}</p>
                </div>
              );
            })}
          </h2>
        </div>
        <Bottom>
          <button onClick={() => route.push("/")}>Continue Shopping</button>
          <img src="./minion.png" alt="minion" />
        </Bottom>
      </div>
    </SuccessPage>
  );
}
