import getAllProduct from "@/api/getAllProduct";
import React from "react";
import SingleProduct from "../singleProduct/singleProduct";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
  let data = await getAllProduct();

  return (
    <div className="container w-[80%] m-auto my-12">
      <div className="flex flex-wrap">
        {data.map((prod:ProductType) => (
          <SingleProduct key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
}
