import React from "react";
import Link from "next/link";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";

export default function SingleProduct({ prod }: { prod: ProductType }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-3">

      <div className="group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(16,185,129,0.35)]">

        {/* Image */}
        <Link href={`/products/${prod.id}`}>
          <div className="relative overflow-hidden bg-white p-4 h-64 flex items-center justify-center">
            
            <img
              src={prod.imageCover}
              alt={prod.title}
              className="w-full h-full object-contain transition duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4">

            <h2 className="text-emerald-900 font-bold text-lg line-clamp-2 group-hover:text-emerald-300 transition">
              {prod.title}
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              {prod.category.name}
            </p>

            <div className="flex justify-between items-center mt-4">

              <span className="px-3 py-1 rounded-xl bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-500/30">
                {prod.price} EGP
              </span>

              <span className="text-yellow-400 flex items-center gap-1 text-sm">
                <i className="fa-solid fa-star"></i>
                {prod.ratingsAverage}
              </span>

            </div>
          </div>
        </Link>

        {/* Add Button */}
        <div className="p-4 pt-0">
          <AddBtn id={prod.id} />
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}