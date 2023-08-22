"use client";
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import cartState from "@/context/cartState";

const CheckoutForm = () => {
  const { user } = useAuth();
  const { cart } = cartState();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const total =
    cart?.length > 0
      ? cart.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;

  const paymenthandler= async () => {
    // @ts-ignore
   const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Trigger form validation and waller collection
    // @ts-ignore
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setErrorMessage(submitError.message);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // @ts-ignore
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      toast.error(error.message);
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
      <div>
      <p className="mt-5">Card Information*</p>
      <CardElement
        className="border-2 rounded-md py-2 px-4 mt-2 border-cs-pink-800"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="mt-5 bg-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 w-full"
        disabled={!stripe}
      >
        Pay
      </button>
     </div>
  );
};

export default CheckoutForm;
