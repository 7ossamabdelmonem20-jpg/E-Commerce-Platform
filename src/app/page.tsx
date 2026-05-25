import Image from "next/image";
import MainSlider from "./_components/MainSlider/MainSlider";
import AllCategories from './_components/CategoriesSlider/CategoriesSlider';
import AllProducts from "./_components/AllProducts/AllProducts";

export default function Home() {
  return <>

  <MainSlider/>
  <AllCategories/>
  <AllProducts/>
  </>
}
