"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductType } from "@/types/product.type";

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/products");

    let data = await res.json();

    setProducts(data.data.slice(8, 15));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-950 py-14">
      <div className="w-[95%] lg:w-[85%] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Featured Products
          </h1>

          <p className="text-gray-200 mt-3">Explore our best products</p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 750,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={products.length > 4}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },

            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product:ProductType) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-3xl cursor-pointer overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300">
                <div className="overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-[250px] object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-emerald-600 font-bold text-xl mt-3">
                    {product.price} EGP
                  </p>

                  <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                    {product.description}
                  </p>

                  <Link href={`/products/${product.id}`}>
                    <button className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl transition duration-300 cursor-pointer">
                      Show Details
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
