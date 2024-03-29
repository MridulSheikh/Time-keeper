"use client";
import Image from "next/image";
import cartState from "../../context/cartState";
import React, { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const CartDropDown = ({ setOpen, items }: any) => {
  const router = useRouter();
  const total =
    items?.length > 0
      ? items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;
  return (
    <div className="absolute hidden group-hover:inline-block top-14 right-14 bg-white p-3 rounded-md z-40 shadow-md w-auto font-semibold overflow-hidden">
      <div className="pb-3 border-b text-cs-pink-800">
        <h1>Total : ${total} </h1>
      </div>
      {items?.lenght < 0 && (
        <p className=" text-gray-600 text-center my-20">cart is emply!</p>
      )}
      <div>
        {items?.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-3 mt-4">
            <div className="relative">
              <Image
                src={item.img}
                alt="product image"
                fill
                className="object-contain"
              />
            </div>
            <div className="col-span-2">
              <h1 className=" text-cs-pink-800">
                {item.name.substring(0, 14)}...
              </h1>
              <h1 className="text-gray-500">
                ${item.price}x{item.quantity}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>  router.push("/cart")}
        className=" mt-5 bg-cs-black text-white w-full py-1 text-sm rounded-md active:opacity-80"
      >
        checkout
      </button>
    </div>
  );
};

const NavbarCart = () => {
  const { cart } = cartState();
  return (
    <div className="group py-5">
      <CartDropDown items={cart} />
      <div className="flex items-center gap-x-2 cursor-pointer font-semibold hover:text-cs-pink-800  ease-in-out duration-200 relative">
        <BsHandbag className="text-3xl md:text-2xl" />
        <div className=" w-4 h-4 bg-cs-pink-800 rounded-full flex justify-center items-center absolute text-white text-sm -top-2 -right-3">
          <p>{cart?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarCart;
