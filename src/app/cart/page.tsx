"use client";

import getLoggedUserCart from "@/cartActions/getUserCart.action";
import React, { useContext, useEffect, useState } from "react";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import removeItemFromCart from "@/cartActions/removeItemCart.action";
import { toast } from "sonner";
import updateCartQuantity from "@/cartActions/updateCartQuntite.action";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cart.type";
import  Link from "next/link";
export default function Cart() {
  const [products, setProducts] = useState<[]>([]);
  const [removeDesiable, setRemoveDesiable] = useState(false);
  const [updateDesiable, setupdateDesiable] = useState(false);
  const { numberOfCartItem, setNumberOfCartItem } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [cartId ,setCartId] = useState("")
  async function getUserCart() {
    try {
      let res = await getLoggedUserCart();

      if (res.status === "success") {
        setProducts(res.data.products);
        // console.log(res.cartId);
        setCartId(res.cartId)
        // console.log(res.data.totalCartPrice);
        setTotal(res.data.totalCartPrice);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteItem(id: string) {
    setRemoveDesiable(true);
    let res = await removeItemFromCart(id);
    //  console.log(res);
    // console.log(res.status);
    if (res.status === "success") {
      // console.log(res.data.products);

      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setNumberOfCartItem(sum);
      setProducts(res.data.products);
      toast.custom((t) => (
        <div className="relative overflow-hidden w-[370px] rounded-[28px] border border-red-500/20 bg-[#111111] p-5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/20">
              🗑️
            </div>

            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">
                Removed Successfully
              </h2>

              <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                Product deleted from your shopping cart
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-zinc-800">
            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 animate-[progress_3s_linear_forwards]" />
          </div>
        </div>
      ));
      setRemoveDesiable(false);
      getUserCart();
    } else {
      toast.error("can't delete item", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  async function updateProduct(id: string, count: string, sign: string) {
    setupdateDesiable(true);
    let res = await updateCartQuantity(id, count);
    // console.log(res);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.custom((t) => (
        <div className="relative overflow-hidden w-[370px] rounded-[28px] border border-emerald-500/20 bg-[#111111] p-5 shadow-2xl">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10" />

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/20">
              🔄
            </div>

            {/* Text */}
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">Quantity Updated</h2>

              <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                Product quantity updated successfully
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-zinc-800">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 animate-[progress_3s_linear_forwards]" />
          </div>
        </div>
      ));
      if (sign === "+") {
        setNumberOfCartItem(numberOfCartItem + 1);
      } else if (sign === "-") {
        setNumberOfCartItem(numberOfCartItem - 1);
      }
      setupdateDesiable(false);
      getUserCart();
    }
  }
  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      {products.length > 0 ? (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500/20 p-3 rounded-2xl">
              <ShoppingCart className="text-emerald-400 w-7 h-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>

              <p className="text-zinc-400 text-sm mt-1">
                You have {products.length} products in your cart
              </p>
            </div>
          </div>

          {/* Cart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Table Head */}
            <div className="hidden lg:grid grid-cols-6 bg-zinc-800/60 px-6 py-4 text-zinc-300 font-medium text-sm">
              <span>Product</span>
              <span>Name</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total Price</span>
              <span></span>
            </div>

            {/* Products */}
            <div className="divide-y divide-zinc-800">
              {products.map((product: CartProductType) => (
                <div
                  key={product._id}
                  className="grid grid-cols-1 lg:grid-cols-6 items-center gap-5 px-6 py-5 hover:bg-zinc-800/40 transition"
                >
                  {/* Image */}
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-24 h-24 object-cover rounded-2xl border border-zinc-700"
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center md:text-left">
                    <h2 className="text-white font-semibold text-lg line-clamp-2">
                      {product.product.title}
                    </h2>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center md:justify-start">
                    <div className="flex items-center gap-4 bg-zinc-800 rounded-full px-3 py-2 border border-zinc-700">
                      <button
                        disabled={updateDesiable}
                        onClick={() =>
                          updateProduct(
                            product.product.id,
                            `${product.count - 1}`,
                            "-",
                          )
                        }
                        className="w-8 disabled:bg-gray-600 disabled:cursor-wait h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition"
                      >
                        <Minus size={16} className="text-white" />
                      </button>

                      <span className="text-white font-bold text-lg min-w-[20px] text-center">
                        {product.count}
                      </span>

                      <button
                        disabled={updateDesiable}
                        onClick={() =>
                          updateProduct(
                            product.product.id,
                            `${product.count + 1}`,
                            "+",
                          )
                        }
                        className="w-8 disabled:cursor-wait disabled:bg-gray-600 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center md:text-left">
                    <span className="text-emerald-400 font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-yellow-400 font-bold text-lg">
                      {product.price * product.count} EGP
                    </span>
                  </div>
                  {/* Remove */}
                  <div className="flex justify-center md:justify-start">
                    <button
                      disabled={removeDesiable}
                      onClick={() => DeleteItem(product.product.id)}
                      className="flex disabled:text-gray-700 disabled:cursor-wait items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}

          <div className="mt-8 flex justify-end">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full md:w-[350px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400">Total</span>

                <span className="text-2xl font-bold text-white">
                  {total}
                  <span className="mx-2">EGP</span>
                </span>
              </div>
              <Link href={`/checkout/${cartId}`}>
                <button className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-2xl transition">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="bg-zinc-900 p-8 rounded-full border border-zinc-800">
            <ShoppingCart className="w-16 h-16 text-zinc-600" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-6">
            Your cart is empty
          </h1>

          <p className="text-zinc-400 mt-2">Add products to start shopping</p>
        </div>
      )}
    </div>
  );
}
