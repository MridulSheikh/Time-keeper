"use client";
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  country : string,
  number : string,
  state : string,
  post : string,
};

const CheckoutForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);

  // handle payment submit function // when user confirm order via email this function well be call
  const onSubmit : SubmitHandler<Inputs> = async (data) => {
    
    console.log(data)

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
      toast.error(error.message)
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <form
      className=" bg-white rounded-md shadow-md p-7 col-span-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <p>Country*</p>
          <input
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your country name"
          />
        </div>
        <div>
          <p>Phone*</p>
          <input
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-5">
        <div>
          <p>State*</p>
          <input
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your state"
          />
        </div>
        <div>
          <p>Post*</p>
          <input
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your post code"
          />
        </div>
      </div>
      <div className="mt-5">
        <p>Address 1 line*</p>
        <input
          type="text"
          className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
          placeholder="Enter your address one line"
        />
      </div>
      <p className="mt-5">Card Information*</p>
      <CardElement
        className="border py-2 px-4 mt-2"
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
    </form>
  );
};

export default CheckoutForm;
