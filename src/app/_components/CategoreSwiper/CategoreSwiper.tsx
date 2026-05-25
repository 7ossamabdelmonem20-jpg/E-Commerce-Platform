"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { CategoryType } from "@/types/categore.type";

export default function CategoreSwiper({ data } :{data:CategoryType[]}) {
  return (
    <div className="py-14 bg-gradient-to-b from-gray-50 to-white">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
          Shop By Category
        </h2>

        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Explore our popular categories
        </p>
      </div>

      {/* Swiper */}
      <div className="w-[95%] lg:w-[90%] mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 750,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },

            768: {
              slidesPerView: 4,
            },

            1024: {
              slidesPerView: 5,
            },

            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {data.map((category:CategoryType) => (
            <SwiperSlide key={category._id}>
              
              <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2">

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition">
                    {category.name}
                  </h3>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}