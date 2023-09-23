"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "../Modal";
import { Select } from "../Shared";
import axios from "axios";
import { SetImageContainer } from "../Brands/AddBrand";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFetchData } from "@/hooks/useFetchData";
import useAuth from "@/hooks/useAuth";

type Inputs = {
  name: string;
  description: string;
  price: number;
};

const AddProductModal = ({ setOpen }: { setOpen: any }) => {
  const { brands, categories, loading } = useFetchData();
  const [brand, setBrand] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string | null | undefined>();
  const { token } = useAuth();
  const toastId = useRef<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setOpen(false);
    if (!brand) {
      toast.error("Brand not found!");
      return;
    } else if (!category) {
      toast.error("Category not found!");
      return;
    } else if (!imageUrl) {
      toast.error("Image not found!");
      return;
    }
    toastId.current = toast.loading("please wait...");
    const body = {
      img: imageUrl,
      name: data.name,
      description: data.description,
      price: data.price,
      brand: brand?.id,
      category: category.id,
    };
    axios
      .post("http://localhost:5000/api/v1/product", body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
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
        console.log(error);
        toast.update(toastId.current, {
          render: error.response.data.message,
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
      <Modal>
        <div className="p-5 rounded-md border bg-white relative z-50 h-[600px] w-[650px] overflow-y-scroll">
          <div
            onClick={() => setOpen(false)}
            className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute top-3 right-3 flex justify-center items-center cursor-pointer"
          >
            X
          </div>
          <div className="text-cs-black">
            <p>Product Image*</p>
            <div className=" w-full h-60 mx-auto bg-cs-nural">
              <SetImageContainer
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="">
              <div className="text-cs-black">
                <p>Name*</p>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.name.message}
                  </p>
                )}
                <input
                  className="border px-4 py-2 rounded-md w-full mt-2"
                  placeholder="Enter the name"
                  type="text"
                  {...register("name", { required: "name is required" })}
                />
              </div>
              <div className="text-cs-black mt-5">
                <p>Description*</p>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.description.message}
                  </p>
                )}
                <textarea
                  className="border p-4 rounded-md w-full mt-2"
                  rows={5}
                  placeholder="Product description...."
                  {...register("description", {
                    required: "description is required",
                  })}
                />
              </div>
              <div className="text-cs-black mt-5">
                <p>Brand*</p>
                <Select
                  className="mt-2"
                  name="please select a brand"
                  value={brands}
                  setState={setBrand}
                  state={brand}
                  disabled={false}
                />
              </div>
              <div className="text-cs-black mt-5">
                <p>Category*</p>
                <Select
                  className="mt-2"
                  name="please select a Category"
                  value={categories}
                  setState={setCategory}
                  state={category}
                  disabled={false}
                />
              </div>
              <div className="text-cs-black mt-5">
                <p>Product Price*</p>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.price.message}
                  </p>
                )}
                <input
                  className="border px-4 py-2 rounded-md w-full mt-2"
                  placeholder="$0.00"
                  type="number"
                  {...register("price", { required: "price is required" })}
                />
              </div>
              <div className="px-4 flex justify-end items-center py-3 bg-white">
                <button className="py-1 w-full bg-cs-black active:opacity-80 text-white rounded-md px-5">
                  upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {open && <AddProductModal setOpen={setOpen} />}
      <button
        onClick={() => setOpen(true)}
        className="bg-green-800 py-2 px-4 text-white rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
      >
        <AiOutlinePlus className=" text-xl" />
        <p>Add</p>
      </button>
    </div>
  );
};
