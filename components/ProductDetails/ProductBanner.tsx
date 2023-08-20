import cartState from "@/context/cartState";
import useCounter, { DECREMENT, INCREMENT } from "@/hooks/useCounter";
import Ratting from "@/lib/Ratting";
import Image from "next/image";
import React from "react";
import { BsSearch } from "react-icons/bs";
import {
  MdAddShoppingCart,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

interface propsType {
  img: string;
  price: number;
  reviews: any;
  brand: string;
  category: string;
  discription: string;
  _id: string;
  name: string;
}

export const ProductBanner = ({
  _id,
  name,
  img,
  price,
  reviews,
  brand,
  category,
  discription,
}: propsType) => {
  const { countHandler, count } = useCounter();
  const { handleAddToCart } = cartState();
  const totalRating =
    reviews?.length > 0
      ? reviews?.reduce(
          (total: number, current: any) => total + current?.ratting,
          0
        )
      : 0;
  return (
    <div className=" grid lg:grid-cols-2 gap-10 my-10">
      <div className="bg-cs-pink-200 h-96 p-10 relative">
        <div className="relative h-full">
          <Image
            alt="product image"
            src={img}
            fill
            className="object-contain"
          />
        </div>
        <button className=" text-lg text-cs-black p-3 rounded-full bg-white absolute top-3 right-4">
          <BsSearch />
        </button>
        <div className=" bg-cs-pink-800 px-3 py-4 text-sm top-3 left-4 text-white inline absolute rounded-full">
          -30%
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="font-oswoald text-3xl flex gap-x-7">
            <h2 className="text-cs-black">${price}</h2>
          </div>
          <Ratting
            rating={{ rate: totalRating / reviews?.length }}
            className="text-cs-pink-800"
          />
        </div>
        <div className=" text-md mt-5 text-cs-gray">{discription}</div>
        <div className="flex gap-x-6 mt-5">
          <div className=" flex border-4 border-r-0 border-cs-pink-800">
            <p className="px-3 py-1 text-xl text-cs-gray">{count}</p>
            <div className="flex flex-col">
              <button
                onClick={() => countHandler(INCREMENT)}
                className="bg-cs-pink-800 text-white text-xl border-b border-white"
              >
                <MdKeyboardArrowUp />
              </button>
              <button
                onClick={() => countHandler(DECREMENT)}
                className="bg-cs-pink-800 text-white text-xl border-t border-white"
              >
                <MdKeyboardArrowDown />
              </button>
            </div>
          </div>
          <button
            onClick={() =>
              handleAddToCart({ _id, name, img, quantity: count, price })
            }
            className="flex justify-center px-5 py-2 text-xl items-center text-white bg-cs-black gap-x-3 active:opacity-80"
          >
            <MdAddShoppingCart />
            <p>Add to Cart</p>
          </button>
        </div>
        <h3 className="text-cs-gray mt-5">Category: {category}</h3>
        <h3 className="text-cs-gray">Brand : {brand}</h3>
      </div>
    </div>
  );
};
