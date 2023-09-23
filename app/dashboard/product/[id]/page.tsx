"use client";
import { Select } from "@/components";
import { SetImageContainer } from "@/components/Brands/AddBrand";
import useAuth from "@/hooks/useAuth";
import { useFetchData } from "@/hooks/useFetchData";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrRefresh } from "react-icons/gr";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  name: string;
  description: string;
  price: number;
};

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [product, setProduct] = useState<any>();
  const { categories, brands, loading } = useFetchData();
  const [image, setImage] = useState<string | null | undefined>();
  const [brand, setBrand] = useState<any>();
  const [category, setCategory] = useState<any>();
  const toastId = useRef<any>(null);
  const params = useParams();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!brand) {
      toast.error("Brand not found!");
      return;
    } else if (!category) {
      toast.error("Category not found!");
      return;
    } else if (!image) {
      toast.error("Image not found!");
      return;
    }
    toastId.current = toast.loading("please wait...");
    const body = {
      img: image,
      name: data.name,
      description: data.description,
      price: data.price,
      brand: brand?.id,
      category: category.id,
    };
    axios
      .patch(`https://free-time-server.onrender.com/api/v1/product/${params.id}`, body, {
        headers: {
          "Content-Type": "application/json",
         " Authorization": "Bearer" + " " + token,
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
  const getProdcutsData = () => {
    setIsLoading(true);
    axios
      .get(`https://free-time-server.onrender.com/api/v1/product/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        setProduct(res.data.data);
        setImage(res.data.data.img);
        setBrand({
          id: res.data.data.brand._id,
          name: res.data.data.brand.name,
        });
        setCategory({
          id: res.data.data.category._id,
          name: res.data.data.category.name,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setProduct(null);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getProdcutsData();
  }, []);
  return (
    <div>
      <div className="bg-cs-black text-white px-4 py-2 sticky top-0 z-10 flex justify-between items-center gap-x-4">
        <h1 className=" text-xl font-bold">Update Product</h1>
        <button
          onClick={getProdcutsData}
          className="bg-blue-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
        >
          <GrRefresh className=" text-white text-xl" />
          <p>Refresh</p>
        </button>
      </div>
      {isLoading || loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : !product ? (
        <div className="w-full h-96 flex justify-center items-center">
          <h1>product not found!</h1>
        </div>
      ) : (
        <div className="p-5">
          <div>
            <div className="w-full h-96 bg-slate-100">
              <SetImageContainer imageUrl={image} setImageUrl={setImage} />
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className=" font-bold text-lg">Name*</p>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.name.message}
                  </p>
                )}
                <input
                  type="text"
                  defaultValue={product.name}
                  className=" w-full border px-4 py-2 rounded-md mt-2"
                  {...register("name", { required: "name field is requierd!" })}
                />
              </div>
              <div className="mt-5">
                <p className=" font-bold text-lg">Description*</p>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.description.message}
                  </p>
                )}
                <textarea
                  rows={15}
                  defaultValue={product.description}
                  className=" w-full border px-4 py-2 rounded-md mt-2"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
              </div>
              <div className="text-cs-black mt-5">
                <p className=" font-bold text-lg">Brand*</p>
                <p className="mt-2">{brand.name}</p>
              </div>
              <div className="text-cs-black mt-5">
                <p className=" font-bold text-lg">Category*</p>
                <p className="mt-2">{category.name}</p>
              </div>
              <div className="mt-5">
                <p className=" font-bold text-lg">Price*</p>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.price.message}
                  </p>
                )}
                <input
                  type="number"
                  defaultValue={product.price}
                  className=" w-full border px-4 py-2 rounded-md mt-2"
                  {...register("price", { required: "price is required" })}
                />
              </div>
              <button className="mt-5 focus:opacity-80 bg-cs-black text-white px-4 py-2 rounded-md">
                update
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
