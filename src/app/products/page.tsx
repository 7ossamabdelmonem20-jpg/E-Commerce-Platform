import React from "react";

import getAllProduct from "@/api/getAllProduct";
import SingleProduct from "../_components/singleProduct/singleProduct";
import AllProducts from "../_components/AllProducts/AllProducts";

export default async function Products() {


  return (
    <>
      <AllProducts/>
    </>
  );
}
