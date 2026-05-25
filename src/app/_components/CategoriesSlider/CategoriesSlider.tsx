import AllCategories from "@/api/Allcatego";
import React from "react";
import CategoreSwiper from "../CategoreSwiper/CategoreSwiper";

export default async function CategoreSlider() {
let data = await AllCategories()
// console.log(data);

  return (
    <>
      <CategoreSwiper data = {data} />
    </>
  );
}