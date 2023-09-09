'use client'
import React from "react";
import { ProductCard } from "../ProductCard";
import { product_data_types } from "@/typedeclaration/types";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

export const Body = async ({
  products,
}: {
  products: product_data_types[];
}) => {
  return (
    <div className="col-span-9 ">
      {products?.length > 0 ? (
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
          {products?.map((dt: any) => (
            <ProductCard
              key={dt._id}
              _id={dt._id}
              name={dt.name}
              img={dt.img}
              price={dt.price}
              reviews={dt.reviews}
            />
          ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-96">
          <div className="w-96 h-96 relative">
            <Image
              alt="not found image"
              fill
              src={"/images/productnotFoundImage.png"}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
