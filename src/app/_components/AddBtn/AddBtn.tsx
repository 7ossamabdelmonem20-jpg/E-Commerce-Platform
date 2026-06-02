"use client";

import AddToCart from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CheckCircle2, ShoppingCart, XCircle } from "lucide-react";
import { CartContext } from "@/context/CartContext";

export default function AddBtn({ id }: { id: string }) {
  const { numberOfCartItem, setNumberOfCartItem } = useContext(CartContext);

  async function checkAddProduct(id: string) {
    let res = await AddToCart(id);

    if (res.status === "success") {
      toast.success("Added to cart", {
        description: "Your product has been added successfully 🛒",
        icon: <CheckCircle2 className="text-emerald-500 w-5 h-5" />,
        className: "!bg-zinc-900 !border !border-emerald-500/30 !text-white",
      });
      setNumberOfCartItem(numberOfCartItem + 1);
    } else {
    toast.error(res.message || "Operation Failed", {
  description: "Something went wrong, please try again.",
  icon: (
    <div className="p-1 bg-red-500/10 rounded-lg -ms-2 text-red-400 border border-red-500/20">
      <XCircle className="w-5 h-5 me-8 " />
    </div>
  ),
  className:
    "!bg-zinc-900/80 !backdrop-blur-md  !border-l-4 !border-l-red-500 !border-y-zinc-800 !border-r-zinc-800 !text-zinc-100 !rounded-xl !p-4 !shadow-xl",
});
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        variant="outline"
        className="cursor-pointer w-full font-bold bg-emerald-800 hover:bg-emerald-700 transition-all duration-300 text-whitemx-auto my-3 rounded-4xl flex items-center gap-2"
      >
        <ShoppingCart size={18} />
        Add To Cart
      </Button>
    </>
  );
}
