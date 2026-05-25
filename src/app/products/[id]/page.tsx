import React from "react";
import Link from "next/link";
import getProductById from "@/api/getProductById";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  let { id } = await params;

  let data = await getProductById(id);
  return (
    <>
      {/* Product Details */}
      <div className="container mx-auto w-[95%] lg:w-[80%] p-5">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Main Image */}
          <div className="w-full md:w-1/3">
            <img
              src={data.imageCover}
              className="w-full rounded-2xl shadow-lg"
              alt="Product Image"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-2/3 space-y-10 text-center md:text-left my-5">
            <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>

            <h2 className="text-lg md:text-xl text-gray-600">
              Brand : {data.brand.name}
            </h2>

            <h2 className="text-lg md:text-xl text-gray-600">
              Category : {data.category.name}
            </h2>

            <p className="text-gray-700 leading-7">{data.description}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start  items-center">
              <span className="bg-green-500 text-white px-4 py-2 rounded-xl">
                Price : {data.price} EGP
              </span>

              <span className="bg-yellow-400 text-black px-4 py-2 rounded-xl flex justify-center items-center">
                <i className="fa-regular fa-star text-yellow-500"></i>{" "}
                {data.ratingsAverage}
              </span>

              <Link
                href={`/products`}
                className=" bg-emerald-600 px-4 py-2 text-white rounded-xl flex justify-center items-center"
              >
                All Product
              </Link>
            </div>
            <AddBtn id={data.id} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto w-[95%] lg:w-[80%] p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.images.map((img: any, index: any) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product ${index}`}
                className="w-full h-40 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
