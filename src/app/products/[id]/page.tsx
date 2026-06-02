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
    <section className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-black text-white py-14 overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="container mx-auto w-[95%] lg:w-[85%] relative z-10">

        {/* Product Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(16,185,129,0.25)]">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 lg:p-12">

            {/* Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition duration-500" />

              <div className="relative bg-white rounded-3xl overflow-hidden p-8">
                <img
                  src={data.imageCover}
                  className="w-full h-[450px] object-contain transition duration-700 group-hover:scale-110"
                  alt={data.title}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">

              <span className="w-fit px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm mb-5">
                {data.category.name}
              </span>

              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                {data.title}
              </h1>

              <p className="text-zinc-300 leading-8 text-lg mb-8">
                {data.description}
              </p>

              {/* Info */}
              <div className="flex flex-wrap gap-4 mb-8">

                <div className="px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/30">
                  {data.price} EGP
                </div>

                <div className="px-5 py-3 rounded-2xl bg-yellow-400 text-black font-bold flex items-center gap-2">
                  <i className="fa-solid fa-star"></i>
                  {data.ratingsAverage}
                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10">
                  Brand : {data.brand.name}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 items-center">

                <Link
                  href="/products"
                  className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-emerald-500 transition duration-300"
                >
                  All Products
                </Link>

                <AddBtn id={data.id} />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-4xl font-black">
              Product Gallery
            </h2>

            <div className="mt-3 w-28 h-1 rounded-full bg-emerald-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.images.map((img: string, index: number) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={img}
                    alt={`Product ${index}`}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">

          <div className="mb-10">
            <span className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm">
              Related Collection
            </span>

            <h2 className="mt-5 text-5xl font-black">
              Similar Products
            </h2>

            <p className="mt-4 text-zinc-300 text-lg">
              Explore more products from the same category
            </p>
          </div>

          <div className="flex flex-wrap gap-y-8">
            {relatedProduct.data.map((prod: ProductType) => (
              <SingleProduct key={prod._id} prod={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}