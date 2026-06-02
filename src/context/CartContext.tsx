"use client";

import getLoggedUserCart from "@/cartActions/getUserCart.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CartContextType = {
  numberOfCartItem: number;
  setNumberOfCartItem: Dispatch<SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
  numberOfCartItem: 0,
  setNumberOfCartItem: () => {},
});
type CartContextProviderProps = {
  children: ReactNode;
};

// هي اللي هتراب الابليكيشن كله

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItem, setNumberOfCartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();

      let sum = 0;

      if (res.status === "success") {
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });

        setNumberOfCartItem(sum);
      }
    } catch (error) {
      console.log("Not Login");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setNumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
