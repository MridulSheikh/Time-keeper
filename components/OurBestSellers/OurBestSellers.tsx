'use client'
import prodcutData from "@/mockdata/PRODUCT_MOCK_DATA";
import React from "react";
import { ProductCard } from "../ProductCard";
import { AnimatePresence } from "framer-motion";
import { product_data_types } from "@/typedeclaration/types";


export const OurBestSellers = ({products} : {products : product_data_types[]}) => {
  return (
    <div className="max-w-screen-2xl mx-auto mt-28 px-4"> 
      <h1 className="text-center font-oswoald text-5xl font-normal text-cs-black">
        Our Products
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
        <AnimatePresence>
        {products.map((dt: product_data_types) => (
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
    </div>
  );
};
