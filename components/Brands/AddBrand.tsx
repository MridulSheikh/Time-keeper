"use client";
import React, { useRef, useState } from "react";
import { Modal } from "../Modal";
import { RiImageAddLine } from "react-icons/ri";

import { useForm, SubmitHandler } from "react-hook-form";
import { ImageUrlSetter } from "../ImageUrlSetter";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

type Inputs = {
  name: string;
  number: string;
};

 export const SetImageContainer = ({
  setImageUrl,
  imageUrl,
}: {
  setImageUrl: any;
  imageUrl: any;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {imageUrl ? (
        <div className="w-full h-40 relative mt-2 rounded-md overflow-hidden">
          <Image src={imageUrl} alt="image" fill className="object-contain" />
          <div
            onClick={() => setImageUrl(null)}
            className=" text-xl bg-black/40 rounded-full absolute top-2 left-2 w-10 h-10 text-white cursor-pointer z-20 flex justify-center items-center hover:bg-black/80"
          >
            <h1>X</h1>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {isOpen && (
            <ImageUrlSetter setIsOpen={setIsOpen} setImage={setImageUrl} />
          )}
          <div
            onClick={() => setIsOpen(true)}
            className="w-full h-40 flex justify-center items-center border border-dashed rounded-md cursor-pointer hover:bg-slate-300"
          >
            <h1 className="text-4xl text-cs-black/60">
              <RiImageAddLine />
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

const AddBrandFrom = ({ isOpen, setIsOpen }: any) => {
  const [imageUrl, setImageUrl] = useState<string | null>();
  const toastId = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!imageUrl) {
      setIsOpen(false)
      toast.error("Image not found");
      return;
    }
    setIsOpen(false)
    toastId.current = toast.loading("please wait...");
    const body = {
      name: data.name,
      number: data.number,
      logo: imageUrl,
    };
    axios
      .post("http://localhost:5000/api/v1/brand", body)
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
    <div className="p-7 rounded-md border bg-white relative w-80">
      <div
        onClick={() => setIsOpen(false)}
        className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
      >
        X
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Name*</p>
          {errors.name && (
            <p className="text-sm text-red-800 pt-1">{errors.name.message}</p>
          )}
          <input
            {...register("name", { required: "Please provide brand name" })}
            type="text"
            className="border rounded-md px-5 py-2 w-full mt-2"
            placeholder="Enter the Brand Name"
          />
        </div>
        <div className="mt-5">
          <p>Supplier Number*</p>
          {errors.number && (
            <p className="text-sm text-red-800 pt-1">{errors.number.message}</p>
          )}
          <input
            {...register("number", {
              required: "Please provide supplier number",
            })}
            type="text"
            className="border rounded-md px-5 py-2 w-full mt-2"
            placeholder="Enter the supllier Number"
          />
        </div>
        <div className="mt-5">
          <p>Brand Logo*</p>
          <SetImageContainer setImageUrl={setImageUrl} imageUrl={imageUrl} />
        </div>
        <button className="w-full py-2 rounded-md bg-cs-black text-white mt-5 focus:opacity-50">
          Save
        </button>
      </form>
    </div>
  );
};

export const AddBrand = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <>
      {isOpen && (
        <Modal>
          <AddBrandFrom isOpen={isOpen} setIsOpen={setIsOpen} />
        </Modal>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md active:opacity-50"
      >
        Add Brand
      </button>
    </>
  );
};
