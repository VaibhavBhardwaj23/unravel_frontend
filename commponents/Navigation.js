import React from "react";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavItems, NavStyle } from "@/styles/NavStyles";
import Cart from "./Cart";
import { useShopContext } from "../lib/Context";
import { AnimatePresence, motion } from "framer-motion";
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0";

const Navigation = () => {
  const { showCart, setShowCart, totalItems } = useShopContext();
  const { user, error, loading } = useUser();
  console.log(user);
  return (
    <NavStyle>
      <Link href={"/"}>UnRavel</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalItems > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalItems}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence> {showCart && <Cart />}</AnimatePresence>
    </NavStyle>
  );
};

export default Navigation;
