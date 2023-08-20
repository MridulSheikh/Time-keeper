"use client";
import { PrivateRoute, ProccedToShipping, TopBanner } from "@/components";
import cartState from "@/context/cartState";
import useAuth from "@/hooks/useAuth";
import { DECREMENT, INCREMENT } from "@/hooks/useCounter";
import Image from "next/image";
import React from "react";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const { cart, handleRremovedItemFromCart, handleQuantityIncrementDecrement } =
    cartState();
  const { user } = useAuth();
  const total =
    cart?.length > 0
      ? cart.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;
  return (
    <PrivateRoute>
      <div className="bg-cs-nural">
        <ToastContainer />
        <TopBanner page={"cart"} route={`home / cart`} />
        <div className="max-w-screen-2xl mx-auto py-10 px-4 md:grid grid-cols-4 gap-x-10">
          {cart?.length > 0 && (
            <div className="col-span-3 bg-white rounded-md shadow-md">
              <div className=" bg-cs-pink-800 text-white font-semibold p-4 rounded-md grid grid-cols-6">
                <h1 className="col-span-3">Discription</h1>
                <p>Quantiy</p>
                <p className="col-span-2">Total Price</p>
              </div>
              {cart.map((item: any) => (
                <div
                  key={item._id}
                  className="py-3 border-b grid grid-cols-6 gap-x-10 px-3"
                >
                  <div className="col-span-3 flex gap-x-2 items-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.img}
                        alt="image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">
                        {item.name.substring(0, 36)}...
                      </h1>
                      <p className="mt-1 text-gray-500 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center justify-between">
                    <button
                      onClick={() =>
                        handleQuantityIncrementDecrement(item._id, INCREMENT)
                      }
                      className="text-md font-bold bg-cs-pink-800 text-white rounded-full w-5 h-5 flex justify-center items-center"
                    >
                      <AiOutlinePlus />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        handleQuantityIncrementDecrement(item._id, DECREMENT)
                      }
                      className="text-md font-bold bg-cs-pink-800 text-white rounded-full w-5 h-5 flex justify-center items-center"
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <div className="col-span-2 flex justify-between items-center">
                    <p className=" text-lg font-semibold">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRremovedItemFromCart(item._id)}
                      className=" w-6 h-6 flex justify-center hover:bg-red-700 hover:text-white ease-in-out duration-300 items-center text-red-600 border-2 rounded-full border-red-700"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            {cart?.length > 0 && user?.email && (
              <ProccedToShipping total={total} />
            )}
          </div>
        </div>
        {cart?.length <= 0 && (
          <div className=" w-full h-96 flex justify-center items-center">
            <div className="relative w-96 h-96">
              <Image
                alt="cart image"
                fill
                className="object-contain"
                src={"/icon/empty-cart.png"}
              />
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Cart;
