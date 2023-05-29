"use client";
import { ProductCard, TopBanner } from "@/components";
import brand_mock_data from "@/mockdata/BRAND_MOCK_DATA";
import prodcutData from "@/mockdata/PRODUCT_MOCK_DATA";
import { product_data_types } from "@/typedeclaration/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const categories = ["Men's", "Women's", "Featured", "Kid's", "Best Sell"];

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cetagory, setCetagory] = useState<string | null>('')
  const [brand, setBrand] = useState<string | null>('')
  return (
    <div>
      <TopBanner page="Shop" route={"home / shop"} />
      <div className="relative grid grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4 ">
        <div className="col-span-3 sticky top-5">
          <div className="bg-cs-pink-200 p-7">
            <h1 className="text-2xl">CETAGORIES</h1>
            <div className=" flex flex-col gap-y-2 items-start mt-7">
              {categories.map((cs) => (
                <button
                  key={cs}
                  onClick={() => setCetagory(cs)}
                  className={cs === cetagory ? 'text-cs-pink-800 font-semibold' : ''}
                >
                  {cs}
                </button>
              ))}
            </div>
          </div>
          <h1 className=" text-3xl font-oswoald font-light mt-10">BRANDS</h1>
          <div className=" grid grid-cols-2 gap-3 mt-10">
            {brand_mock_data.map((dr) => (
              <button
                onClick={() => setBrand(dr.name)}
                key={dr.name}
                className={`relative w-full  h-28 overflow-hidden ${dr.name === brand && 'broder border-2 border-cs-pink-800'}`}
              >
                <Image alt="image" src={dr.img} fill className="object-cover" />
              </button>
            ))}
          </div>
          <button className=" bg-cs-pink-800 text-white py-3 mt-10 px-7" onClick={() => router.push(`/shop?category=${cetagory}&brand=${brand}`)}>Fillter</button>
        </div>
        <div className="col-span-9 ">
          <div className="flex gap-x-5">
            {searchParams.has("category") && (
              <h1 className="mb-6">
                Cetagory : {searchParams.get("category")} (0)
              </h1>
            )}
            {searchParams.has("brand") && (
              <h1 className="mb-6">Brand : {searchParams.get("brand")} (0)</h1>
            )}
          </div>
         <div className=" grid grid-cols-3 gap-5">
            {prodcutData.map((dt: product_data_types) => (
              <ProductCard
                key={dt.id}
                id={dt.id}
                title={dt.title}
                img={dt.img}
                price={dt.price}
                off={dt.off}
                ratting={dt.ratting}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
