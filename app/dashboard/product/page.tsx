"use client";
import { AddProduct, PorductRow } from "@/components";
import useSelectItem from "@/hooks/useSelectItem";
import { Brand_data_types, Category_data_types } from "@/typedeclaration/types";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiCheckbox } from "react-icons/bi";
import { GrRefresh } from "react-icons/gr";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

interface productTypes {
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
  __v: string;
}

const Page = () => {
  const [products, setProducts] = useState<productTypes[] | null>();
  const [productsId, setProductsId] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    selectItem,
    handleSingleItemSelect,
    findItemFromArray,
    handleAllselect,
    setSelectItem
  } = useSelectItem();
  const getProdcutsData = () => {
    setProductsId([])
    setSelectItem([])
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setProducts(null);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getProdcutsData();
  }, []);
  useEffect(() => {
    setProductIdhandler();
  }, [products]);
  const setProductIdhandler = () => {
    products?.map((pt: productTypes) =>
      setProductsId((a: any) => [...a, pt._id])
    );
  };
  return (
    <div>
      <div className="bg-cs-black text-white px-5 py-2 flex justify-between items-center sticky top-0 z-20">
        <h1 className=" text-xl">Product</h1>
        <div className=" flex items-center gap-x-3">
          <AddProduct />
          {selectItem?.length > 0 && (
            <button className="bg-red-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2">
              <AiOutlineDelete className=" text-white text-xl" />
              <p>delete {selectItem?.length} item</p>
            </button>
          )}

          <button
            onClick={getProdcutsData}
            className="bg-blue-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
          >
            <GrRefresh className=" text-white text-xl" />
            <p>Refresh</p>
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-6 px-5 py-2 bg-cs-nural border-b sticky top-14">
        <div className=" col-span-3 flex justify-start gap-x-2 items-center">
          <button
            onClick={() => handleAllselect(productsId)}
            className="text-xl"
          >
            {selectItem.length === products?.length ? (
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
            {products ? (
              <div>
                {products?.map((product: productTypes) => (
                  <PorductRow
                    findItemFromArray={findItemFromArray}
                    selectItem={selectItem}
                    handleSingleItemSelect={handleSingleItemSelect}
                    key={product?._id}
                    _id={product?._id}
                    name={product?.name}
                    img={product?.img}
                    brand={product?.brand}
                    category={product?.category}
                    price={product?.price}
                  />
                ))}
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
