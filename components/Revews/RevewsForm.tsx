"use client";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  ratting: string;
  review: string;
};

export const RevewsForm = ({ name, id }: { name: string; id: string }) => {
  const { user, token } = useAuth();
  const toastId = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toastId.current = toast.loading("please wait...");
    const body = {
      email: user.email,
      ratting: parseFloat(data.ratting),
      review: data.review,
    };
    axios
      .patch(`http://localhost:5000/api/v1/product/review/${id}`, body,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        toast.update(toastId.current, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.errormessage,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <h1 className=" text-3xl font-oswoald text-cs-gray uppercase">
        Be the first to review “{name}”
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className=" text-md font-oswoald font-extralight mt-5">
          Your Name or E-mail will not be published. Required fields are marked
          *
        </p>
        <div className="mt-5">
          <p className=" text-md font-oswoald font-extralight">Your Ratting*</p>
          <select
            {...register("ratting", { required: true })}
            className="mt-1 w-full border px-3 py-2 border-cs-pink-800 rounded-md outline-none text-cs-pink-800"
          >
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
            <option value={4.5}>4.5</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="mt-5">
          <p className=" text-md font-oswoald font-extralight">Your Review*</p>
          <textarea
            {...register("review", { required: true })}
            className="w-full mt-1 bg-cs-gray/80 rounded-md outline-none p-4"
            rows={10}
          />
        </div>
        <input
          type="submit"
          className="w-full py-2 active:opacity-80 bg-cs-black text-white rounded-md cursor-pointer mt-5"
        />
      </form>
    </div>
  );
};
