"use client";
import { AddBrand, BrandCard } from "@/components";
import { Brand_data_types } from "@/typedeclaration/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Brand = () => {
  const [brands, setBrands] = useState<Brand_data_types[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getBrandData();
  }, []);
  const getBrandData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/v1/brand")
      .then((res) => {
        setBrands(res?.data?.data);
      })
      .catch((error) => {
        setBrands(null)
        toast.error(error.response.data.errormessage);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <div className="p-5 sticky top-0 bg-white z-30">
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
        <div className="mt-4 border rounded-md overflow-hidden bg-white">
          <div className="bg-cs-black grid grid-cols-5 p-2 text-white">
            <h2 className="col-span-2">Name</h2>
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
