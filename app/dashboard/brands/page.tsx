"use client";
import { AddBrand, BrandCard } from "@/components";
import useAuth from "@/hooks/useAuth";
import { Brand_data_types } from "@/typedeclaration/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Brand = () => {
  const {token} = useAuth()
  const [brands, setBrands] = useState<Brand_data_types[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getBrandData();
  }, []);
  const getBrandData = () => {
    setIsLoading(true);
    axios
      .get("https://free-time-server.onrender.com/api/v1/brand",{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        setBrands(res?.data?.data);
      })
      .catch((error) => {
        setBrands(null)
        toast.error(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <div className="pt-5 px-5 pb-3 border-b sticky top-0 bg-white z-30">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Brands</h1>
          <div className="flex space-x-3 items-center">
            <AddBrand />
            <button
              onClick={getBrandData}
              className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md active:opacity-80"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-hidden bg-white">
          <div className="grid grid-cols-5 pt-2 text-cs-black">
            <h2></h2>
            <h2>Name</h2>
            <h2>Product</h2>
            <h2>Supplier Number</h2>
            <h2></h2>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="w-full h-96 flex justify-center items-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          </div>
        ) : (
          <div className="px-5">
            {!brands ? (
              <div className="w-full h-96 flex justify-center items-center">
                <h1>brands not found!</h1>
              </div>
            ) : (
              <div>
                {brands?.map((br: Brand_data_types) => (
                  <BrandCard
                    logo={br?.logo}
                    key={br?._id}
                    name={br?.name}
                    _id={br?._id}
                    product={br?.products}
                    number={br?.number}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer limit={1} />
    </>
  );
};

export default Brand;
