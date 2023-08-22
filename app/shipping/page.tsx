"use client";
import { PrivateRoute, ShippingForm, TopBanner } from "@/components";
import cartState from "@/context/cartState";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/shipping/CheckoutForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

// @ts-ignore
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

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
  return (
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
              <div className="h-80 overflow-y-scroll mt-2">
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
  );
};

export default Shipping;
