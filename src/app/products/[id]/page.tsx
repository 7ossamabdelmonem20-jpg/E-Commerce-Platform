import React from "react";
import Link from "next/link";
import getProductById from "@/api/getProductById";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import getRelatedProduct from "@/ProductCateguryAction/relatedProduct.action";
import { ProductType } from "@/types/product.type";
import SingleProduct from "@/app/_components/singleProduct/singleProduct";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let { id } = await params;

  let data = await getProductById(id);
  if (!data) return <h1>No Data</h1>;

  let relatedProduct = await getRelatedProduct(data.category._id);

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-black text-white py-16">

      <div className="w-[95%] lg:w-[85%] mx-auto space-y-20">

        {/* PRODUCT MAIN CARD */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <div className="relative group">
            <div className="absolute -inset-6 bg-emerald-500/20 blur-3xl rounded-full" />

            <div className="relative bg-white rounded-3xl overflow-hidden p-8 border border-white/10">
              <img
                src={data.imageCover}
                alt={data.title}
                className="w-full h-[500px] object-contain group-hover:scale-110 transition duration-700"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">

            <span className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm">
              {data.category.name}
            </span>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight">
              {data.title}
            </h1>

            <p className="text-zinc-300 leading-8">
              {data.description}
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-4">

              <div className="px-5 py-3 rounded-2xl bg-emerald-500 font-bold shadow-lg shadow-emerald-500/30">
                {data.price} EGP
              </div>

              <div className="px-5 py-3 rounded-2xl bg-yellow-400 text-black font-bold flex items-center gap-2">
                <i className="fa-solid fa-star"></i>
                {data.ratingsAverage}
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10">
                Brand: {data.brand.name}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap">

              <Link
                href="/products"
                className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-emerald-500 transition"
              >
                All Products
              </Link>

              <AddBtn id={data.id} />
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div>
          <h2 className="text-4xl font-black mb-10">
            Product Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.images.map((img: string, index: number) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl group"
              >
                <img
                  src={img}
                  className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RELATED */}
        <div>

          <div className="mb-10">
            <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-sm">
              Related Products
            </span>

            <h2 className="text-5xl font-black mt-5">
              You may also like
            </h2>
          </div>

          <div className="flex flex-wrap">
            {relatedProduct.data.map((prod: ProductType) => (
              <SingleProduct key={prod._id} prod={prod} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}