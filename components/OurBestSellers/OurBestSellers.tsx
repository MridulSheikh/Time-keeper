import prodcutData from "@/mockdata/PRODUCT_MOCK_DATA";
import { product_data_types } from "@/typedeclaration/types";
import React from "react";
import { ProductCard } from "../ProductCard";

export const OurBestSellers = () => {
  return (
    <div className="max-w-screen-2xl mx-auto mt-28 px-4">
      <h1 className="text-center font-oswoald text-5xl font-normal">
        Our Bestsellers
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
        {prodcutData.slice(0, 4).map((dt: any) => (
          <ProductCard
            key={dt.id}
            _id={dt.id}
            name={dt.title}
            img={dt.img}
            price={dt.price}
            reviews={dt.ratting}
          />
        ))}
      </div>
      <div className="mt-[49px] flex justify-center">
        <button className="border px-7 py-3 font-roboto border-cs-black hover:bg-cs-black hover:text-white ease-in duration-200 ">
          SHOW ALL
        </button>
      </div>
    </div>
  );
};
