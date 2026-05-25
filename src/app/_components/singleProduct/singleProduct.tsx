import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
export default function SingleProduct({ prod } :{prod:ProductType}) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-3 " key={prod._id}>
        <Card className="bg-green-300 rounded-t-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 cursor-pointer">
          <Link href={`/products/${prod.id}`}>
            <CardHeader>
              <CardTitle className="line-clamp-2 text-gray-700">
                {prod.title}
              </CardTitle>
              <CardDescription>{prod.category.name} </CardDescription>
              <CardAction className="text-emerald-900 font-bold">
                {prod.price} EGP
              </CardAction>
            </CardHeader>

            <CardContent>
              <img
                src={prod.imageCover}
                alt="Image Cover Product "
                className="w-full"
              />
            </CardContent>

            <CardFooter>
              <p>
                {prod.ratingsAverage}{" "}
                <i className="fa-regular fa-star text-yellow-500"></i>
              </p>
            </CardFooter>
          </Link>
          <AddBtn id = {prod.id}/>
        </Card>
      </div>
    </>
  );
}
