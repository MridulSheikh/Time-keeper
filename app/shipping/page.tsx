"use client";
import { PrivateRoute, ShippingForm, TopBanner } from "@/components";
import cartState from "@/context/cartState";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Shipping = () => {
  const { cart } = cartState();
  const { user } = useAuth();
  const router = useRouter();
  const total =
    cart?.length > 0
      ? cart.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;

  useEffect(() => {
    if (!user?.verified) router.replace("/");
  }, []);
  return cart?.length > 0 ? (
    <PrivateRoute>
      <div>
        <ToastContainer />
        <TopBanner page={"shipping"} route={"home / shipping"} />
        <div className="bg-cs-nural p-10 lg:grid grid-cols-3 gap-x-10">
          <div className="col-span-2">
            <ShippingForm />
          </div>
          <div>
            <div className="bg-white shadow-md rounded-md p-5">
              <div className="text-xl font-bold text-cs-black pb-5 border-b">
                <h1>Items : {cart?.length}</h1>
              </div>
              <div className="mt-2">
                {cart?.map((item: any, index: number) => (
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
              <div className="border-t mt-2 pt-2">
                <p>Tax : $0.00</p>
                <p className="mt-2">Delivery charge : Depend on your area</p>
                <p className="mt-2 font-bold">
                  Subtotal : ${parseFloat(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  ) : (
    <div className="text-center w-full h-screen flex justify-center flex-col items-center">
      <ToastContainer />
      <h1 className=" text-7xl font-bold text-red-500 mx-auto">4O4</h1>
      <h1 className=" text-2xl font-bold text-red-500">Page not found!</h1>
    </div>
  );
};

export default Shipping;
