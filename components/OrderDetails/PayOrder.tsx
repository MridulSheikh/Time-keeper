"use client";
import React, { useState } from "react";
import CheckoutForm from "../shipping/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "../Modal";
import {ImCross} from "react-icons/im"
import { ToastContainer } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || " ");

export const PayOrder = ({ total, id }: { total: number; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <ToastContainer />
      <h1 className="mt-10 mb-4 text-xl font-semibold">
        You haven&apos;t paid yet. You must pay to receive the product.
      </h1>
      <div className="border overflow-hidden w-full lg:w-6/12">
        <h1 className=" text-md bg-cs-pink-800 font-semibold text-white p-2">
          Payment
        </h1>
        <div className="p-4">
          <div>
            <h1 className=" text-xl font-bold">Total</h1>
            <p className="mt-2 font-semibold text-gray-600">${total}</p>
          </div>
        </div>
        <div className="m-4">
          <button onClick={() => setIsOpen(true)} className="bg-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 w-full">Make a payment</button>
        </div>
        {isOpen && (
            <div>
              <Modal>
                <div className="bg-white rounded-md border p-5 pt-10 w-96 relative">
                <button onClick={() => setIsOpen(false)} className=" absolute top-2 right-2"><ImCross /></button>
                <p className="text-md my-2">Enter your card information*</p>
                <Elements stripe={stripePromise}>
                  <CheckoutForm total={total} order_id={id} setIsOpen={setIsOpen} />
                </Elements>
                </div>
              </Modal>
            </div>
          )}
      </div>
    </div>
  );
};
