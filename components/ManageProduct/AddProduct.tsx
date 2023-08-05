"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "../Modal";
import { Select } from "../Shared";
import axios from "axios";
import { SetImageContainer } from "../Brands/AddBrand";

const AddProductModal = ({ setOpen }: { setOpen: any }) => {
  const [brands, setBrands] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [brand, setBrand] = useState<string | null | undefined>();
  const [categories, setCategories] = useState<any>();
  const [category, setCategory] = useState<string | null | undefined>();
  const [imageUrl, setImageUrl] = useState<string | null | undefined>();

  useEffect(() => {
    getBrands();
    getCategory();
  }, []);

  const getBrands = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/brand")
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((error) => {
        setBrands(null);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  const getCategory = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        setCategories(null);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Modal>
        <form className=" pt-5 rounded-md border bg-white relative">
          <div className="h-[600px] w-[600px] overflow-y-scroll px-5">
            <div
              onClick={() => setOpen(false)}
              className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
            >
              X
            </div>
            <div className="text-cs-black">
              <p>Name*</p>
              <input
                className="border px-4 py-2 rounded-md w-full mt-2"
                placeholder="Enter the name"
                type="text"
              />
            </div>
            <div className="text-cs-black mt-5">
              <p>Description*</p>
              <textarea
                className="border p-4 rounded-md w-full mt-2"
                rows={5}
                placeholder="Product description...."
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
              />
            </div>
            <div className="text-cs-black mt-5">
              <p>Product Price*</p>
              <input
                className="border px-4 py-2 rounded-md w-full mt-2"
                placeholder="$0.00"
                type="number"
              />
            </div>
            <div className="text-cs-black mt-5">
              <p>Product Image*</p>
              <div className=" w-3/5 mx-auto bg-cs-nural">
                <SetImageContainer
                  setImageUrl={setImageUrl}
                  imageUrl={imageUrl}
                />
              </div>
            </div>
            <div className="px-4 flex justify-end items-center py-3 bg-white">
              <button className="py-1 w-full bg-cs-black active:opacity-80 text-white rounded-md px-5">
                upload
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
        {
            open && <AddProductModal setOpen={setOpen} />
        }
      <button onClick={() => setOpen(true)} className="bg-green-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2">
        <AiOutlinePlus className=" text-xl" />
        <p>Add</p>
      </button>
    </div>
  );
};
