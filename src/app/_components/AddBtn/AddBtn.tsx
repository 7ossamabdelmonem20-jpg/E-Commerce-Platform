"use client";

import AddToCart from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { CheckCircle2, ShoppingCart, XCircle } from "lucide-react";

export default function AddBtn({ id }: { id: string }) {
  
  async function checkAddProduct(id: string) {
    let res = await AddToCart(id);

    if (res.status === "success") {
      toast.success("Added to cart", {
        description: "Your product has been added successfully 🛒",
        icon: <CheckCircle2 className="text-emerald-500 w-5 h-5" />,
        className:
          "!bg-zinc-900 !border !border-emerald-500/30 !text-white",
      });
    } else {
      toast.error("Failed to add product", {
        description: "Something went wrong, please try again.",
        icon: <XCircle className="text-red-500 w-5 h-5" />,
        className:
          "!bg-zinc-900 !border !border-red-500/30 !text-white",
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