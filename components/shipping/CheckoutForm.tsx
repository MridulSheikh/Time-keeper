"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import cartState from "@/context/cartState";
import axios from "axios";

const CheckoutForm = ({total, order_id, setIsOpen} : {total : number, order_id : string, setIsOpen : any}) => {
  const { user, token } = useAuth();
  const { cart } = cartState();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [ClientSecreet, setClientSecreet] = useState<string>();
  const [loading, setLoading] = useState(false)
  const paymenthandler = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    
    setLoading(true)

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

    //confirm card payment
    const { paymentIntent, error: intentError } =
      // @ts-ignore
      await stripe.confirmCardPayment(ClientSecreet!, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (intentError) {
        toast.error(intentError?.message!);
      } else {
        toast.success("your payment is complete");
        axios.patch(`https://free-time-server.onrender.com/api/v1/order/${order_id}`,{paid : true},{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        })
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
        // setTransitionId(paymentIntent.id);
      }
      setLoading(false)
      setIsOpen(false)
  };


  useEffect(() => {
    axios
    .post("https://free-time-server.onrender.com/api/v1/create-payment-intent",{total : total},{
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token,
      },
    })
    .then((res) => {
      setClientSecreet(res.data.clientSecret)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [token]);

  return (
    <form onSubmit={paymenthandler}>
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
      {

      }
      <button
        type="submit"
        className="mt-5 bg-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 w-full"
        disabled={!stripe}
      >
        {loading ? "Please wait...." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
