"use client";
import { AddProduct, DeletProduct, DahsboardPagination, PorductRow } from "@/components";
import useSelectItem from "@/hooks/useSelectItem";
import { Brand_data_types, Category_data_types } from "@/typedeclaration/types";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

export interface productTypes {
  _id: string;
  img: string;
  name: string;
  description: string;
  brand: Brand_data_types;
  category: Category_data_types;
  price: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface dataTypes{
  total : number,
  pagecount : number,
  products : productTypes[]
}

const Page = () => {
  const [data, setData] = useState<dataTypes | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(9)
  const {
    selectItem,
    handleSingleItemSelect,
    findItemFromArray,
    handleAllselect,
    setSelectItem,
  } = useSelectItem();
  const getProdcutsData = () => {
    setSelectItem([]);
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/product?page=${page}&limit=${limit}&populate=brand,category&fields=img,_id,category,brand,name,price`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getProdcutsData();
  }, [page, limit]);
  return (
    <div className="relative">
      <div className="sticky top-0 z-20">
        <div className="bg-white text-cs-black px-5 py-2 flex justify-between items-center">
          <h1 className=" text-xl font-bold">Products</h1>
          <div className=" flex items-center gap-x-3">
            <AddProduct />
            {selectItem?.length > 0 && <DeletProduct selectItem={selectItem} />}

            <button
              onClick={getProdcutsData}
              className="bg-blue-800 text-white py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
            >
              <GrRefresh className="text-white text-xl" />
              <p>Refresh</p>
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-7 px-10 py-2 bg-white border-b">
          <div className=" col-span-3 flex justify-start gap-x-2 items-center">
            <button
              onClick={() => handleAllselect(data?.products)}
              className="text-xl"
            >
              {selectItem.length === data?.products.length ? (
                <IoIosCheckbox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </button>
            <h1>Name</h1>
          </div>
          <h1>Category</h1>
          <h1>Brand</h1>
          <h1>Price</h1>
          <div />
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
          <div>
            {data ? (
              <div className=" mb-40">
                {/* @ts-ignore */}
                {data?.products?.map((product: productTypes) => (
                  <PorductRow
                    findItemFromArray={findItemFromArray}
                    selectItem={selectItem}
                    handleSingleItemSelect={handleSingleItemSelect}
                    key={product?._id}
                    _id={product?._id}
                    img={product?.img}
                    name={product?.name}
                    brand={product?.brand}
                    category={product?.category}
                    price={product?.price}
                  />
                ))}
                <DahsboardPagination page={page} setPage={setPage} pageCount={data?.pagecount} />
              </div>
            ) : (
              <div className="w-full h-96 flex justify-center items-center">
                <h1>product not found !</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
