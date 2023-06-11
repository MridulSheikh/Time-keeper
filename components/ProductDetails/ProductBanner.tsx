import Ratting from "@/lib/Ratting";
import Image from "next/image";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdAddShoppingCart, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const ProductBanner = () => {
  return (
    <div className=" grid lg:grid-cols-2 gap-10 my-10">
      <div className="bg-cs-pink-200 h-96 p-10 relative">
          <div className="relative h-full">
          <Image alt="product image" src="/images/slider3_slide2_02-copyright.png" fill className="object-contain" />
          </div>
          <button className=" text-lg text-cs-black p-3 rounded-full bg-white absolute top-3 right-4"><BsSearch/></button>
          <div className=" bg-cs-pink-800 px-3 py-4 text-sm top-3 left-4 text-white inline absolute rounded-full">
            -40%
          </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="font-oswoald text-3xl flex gap-x-7">
            <del className="text-cs-gray">$450.00</del>
            <h2 className="text-cs-black">$430.00</h2>
          </div>
          <Ratting rating={{ rate: 4.5 }} className="text-cs-pink-800" />
        </div>
        <p className=" text-md mt-5 text-cs-gray">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiati.
        </p>
        <div className="flex gap-x-6 mt-5">
            <div className=" flex border-4 border-r-0 border-cs-pink-800">
                <p className="px-3 py-1 text-xl text-cs-gray">1</p>
                <div className="flex flex-col">
                    <button className="bg-cs-pink-800 text-white text-xl border-b border-white"><MdKeyboardArrowUp /></button>
                    <button className="bg-cs-pink-800 text-white text-xl border-t border-white"><MdKeyboardArrowDown /></button>
                </div>
            </div>
            <button className="flex justify-center px-5 py-2 text-xl items-center text-white bg-cs-black gap-x-3">
                <MdAddShoppingCart />
                <p>Add to Cart</p>
            </button>
        </div>
        <h3 className="text-cs-gray mt-5">Category: Gold watches</h3>
        <h3 className="text-cs-gray">Tags    : Accessories, Watches</h3>
      </div>
    </div>
  );
};
