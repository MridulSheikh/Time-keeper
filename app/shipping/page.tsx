"use client";
import { PrivateRoute, TopBanner } from "@/components";
import cartState from "@/context/cartState";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/shipping/CheckoutForm";

// @ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const Shipping = () => {
  const { cart } = cartState();
  const { user } = useAuth();
  const total =
    cart?.length > 0
      ? cart.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
  };

  return (
    <PrivateRoute>
      <div>
        <ToastContainer />
        <TopBanner page={"shipping"} route={"home / shipping"} />
        <div className="bg-cs-nural p-10 lg:grid grid-cols-3">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Shipping;
