import { useContext, createContext, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalItems, seTotalItems] = useState(0);
  const [totalPrice, seTotalPrice] = useState(0);
  const increase = () => {
    setQty((prevState) => prevState + 1);
  };
  const decrease = () => {
    setQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };

  const onAdd = (product, quantity) => {
    seTotalPrice((prevTotal) =>
      Math.round(prevTotal + product.Price * quantity)
    );
    console.log(totalPrice);
    seTotalItems((prevTotal) => prevTotal + quantity);
    // Check if Product Exists
    const exists = cartItem.find((items) => items.Slug === product.Slug);
    if (exists) {
      setCartItem(
        cartItem.map((item) =>
          item.Slug === product.Slug
            ? { ...exists, quantity: exists.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...product, quantity: quantity }]);
    }
  };

  // Remove Fromm Cart

  const remove = (product) => {
    seTotalPrice((prevTotal) => Math.round(prevTotal - product.Price));
    seTotalItems((prevTotal) => prevTotal - 1);
    // Check if Product Exists
    const exists = cartItem.find((items) => items.Slug === product.Slug);
    if (exists.quantity === 1) {
      setCartItem(cartItem.filter((item) => item.Slug !== product.Slug));
    } else {
      setCartItem(
        cartItem.map((items) => {
          if (items.Slug === product.Slug) {
            return { ...exists, quantity: exists.quantity - 1 };
          } else {
            return items;
          }
        })
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increase,
        decrease,
        showCart,
        setShowCart,
        onAdd,
        cartItem,
        setCartItem,
        remove,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
