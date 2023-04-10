import {
  Button,
  Card,
  CardInfo,
  CartStyle,
  CartWrapper,
  Checkout,
  EmptyStyle,
  Quantity,
  Cards,
} from "@/styles/CartStyle";
import Image from "next/image";
import React from "react";
import { useShopContext } from "../lib/Context";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Cart = () => {
  const { cartItem, setShowCart, onAdd, remove, totalPrice } = useShopContext();

  // Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch(`/api/stripe`, {
      method: "POST",
      headers: { "Content-Type": "applicatiom / json" },
      body: JSON.stringify(cartItem),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        animate={{ x: "0%" }}
        initial={{ x: "10%" }}
        exit={{ x: "10%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItem.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>There is nothing here. You have shoppingg to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItem.length >= 1 &&
            cartItem.map((item) => {
              return (
                <Card
                  variants={card}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  key={item.Slug}
                >
                  <img
                    src={item.Image.data.attributes.formats.thumbnail.url}
                    alt="Product"
                  />
                  <CardInfo>
                    <h1>{item.Title}</h1>
                    <h3>${item.Price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <div>
                        <button onClick={() => remove(item)}>
                          <AiFillMinusCircle />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onAdd(item, 1)}>
                          <AiFillPlusCircle />
                        </button>
                      </div>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        <Checkout layout>
          <span>Subtotal : ${totalPrice}</span>
          <button onClick={handleCheckout}>Purchase</button>
        </Checkout>
      </CartStyle>
    </CartWrapper>
  );
};

export default Cart;
