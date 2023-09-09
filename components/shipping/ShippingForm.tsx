"use client";
import cartState from "@/context/cartState";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  country: string;
  number: string;
  state: string;
  post: string;
  address_1_line: string;
};

export const ShippingForm = () => {
  const { user, token } = useAuth();
  const { cart, setCart } = cartState();
  const toastId = useRef<any>(null);
  const total =
    cart?.length > 0
      ? cart.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0)
      : 0;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const body = {
      item: cart,
      total: total,
      address: {
        country: data.country,
        number: data.number,
        state: data.state,
        post: data.post,
        email: user.email,
        address_1_line: data.address_1_line,
      },
    };
    toastId.current = toast.loading("please wait...");
    axios.post(`https://free-time-server.onrender.com/api/v1/order`,body,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token,
      },
    })
    .then((res)=>{
      localStorage.removeItem("cart");
      setCart(null)
      toast.update(toastId.current, {
        render: "please check your email to confirm your order",
        type: "success",
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 6000,
      });
    }).catch(error => {
      toast.update(toastId.current, {
        render: "your order not placed please try again",
        type: "error",
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 6000,
      });
    })
  };
  return (
    <>
    <form
      className=" bg-white rounded-md shadow-md p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <p>Country*</p>
          {errors.country && (
            <p className="my-2 text-red-800">This field is required</p>
          )}
          <input
            {...register("country", { required: true })}
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your country name"
          />
        </div>
        <div>
          <p>Phone*</p>
          {errors.number && (
            <p className="my-2 text-red-800">This field is required</p>
          )}
          <input
            {...register("number", { required: true })}
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-5">
        <div>
          <p>State*</p>
          {errors.state && (
            <p className="my-2 text-red-800">This field is required</p>
          )}
          <input
            {...register("state", { required: true })}
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your state"
          />
        </div>
        <div>
          <p>Post*</p>
          {errors.post && (
            <p className="my-2 text-red-800">This field is required</p>
          )}
          <input
            {...register("post", { required: true })}
            type="text"
            className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
            placeholder="Enter your post code"
          />
        </div>
      </div>
      <div className="mt-5">
        <p>Address 1 line*</p>
        {errors.address_1_line && (
          <p className="my-2 text-red-800">This field is required</p>
        )}
        <input
          {...register("address_1_line", { required: true })}
          type="text"
          className="mt-2 w-full px-4 py-2 border focus:outline-cs-pink-800"
          placeholder="Enter your address one line"
        />
      </div>
      <button
        type="submit"
        className="mt-5 bg-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 w-full"
      >
        Place order
      </button>
    </form>
    </>
  );
};
