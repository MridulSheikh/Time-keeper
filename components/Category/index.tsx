"use client";
import { LoadingModal, MessageModal } from "@/components";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { RotatingLines } from "react-loader-spinner";

const Category = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<null | string>(null);
  const [category, setCategory] = useState([]);
  const handleAddCategory = (e: any) => {
    const type = e.target.type.value;
    setIsLoading(true);
    axios
      .post("https://free-time-server.onrender.com/api/v1/category", {
        name: type,
        create_by: user.email,
      })
      .then((res) => setMsg(res.data.message))
      .catch((error) => setMsg(error.response.data.message))
      .finally(() => {
        getcategory();
      });
    e.preventDefault();
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = () => {
    setIsLoading(true);
    axios
      .get("https://free-time-server.onrender.com/api/v1/category")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        setCategory([]);
        setMsg(error?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-5">
      {msg && <MessageModal text={msg} setMsg={setMsg} />}
      <div className=" flex justify-between">
        <div>
          <h1 className=" text-xl font-bold text-cs-black">Category</h1>
          <form
            className="flex gap-x-2 items-center mt-3"
            onSubmit={handleAddCategory}
          >
            <input
              type="text"
              name="type"
              placeholder="add category type"
              className="px-3 py-2 h-full border border-cs-black rounded-md focus:outline-cs-pink-800"
              required
            />
            <button
              type="submit"
              className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md"
            >
              add
            </button>
          </form>
        </div>
        <button
          onClick={getcategory}
          className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md"
        >
          refresh
        </button>
      </div>
      <div className="mt-4 border rounded-md overflow-hidden bg-white">
        <div className="bg-cs-black grid grid-cols-4 p-2 text-white">
          <h2>Name</h2>
          <h2>Product</h2>
          <h2>Create by</h2>
          <h2>Action</h2>
        </div>
        <div>
          {isLoading ? (
            <div className=" w-full h-96 flex justify-center items-center">
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
              {category.length > 0 ? (
                <div>
                  {category?.map((k: any) => (
                    <CategoryCard
                      key={k._id}
                      setMsg={setMsg}
                      setCategory={setCategory}
                      id={k._id}
                      name={k.name}
                      create_by={k.create_by}
                      product={k.products}
                      category = {category}
                    />
                  ))}
                </div>
              ) : (
                <div className=" text-center py-36">
                  <h1 className="text-cs-black opacity-70">
                    Please add some category
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
