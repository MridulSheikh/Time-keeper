"use client";
import { Brand_data_types, Category_data_types } from "@/typedeclaration/types";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Sidebar = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category_data_types[]>();
  const [brands, setBrands] = useState<Brand_data_types[]>();
  const [maximum, setMaximum] = useState("50000");
  const [minimum, setMinimum] = useState("10000");
  const search = useSearchParams();
  const queryBrand = search.get("brand");

  // get categories data
  const getCategories = () => {
    const uri = `https://free-time-server.onrender.com/api/v1/category`;
    axios
      .get(uri)
      .then((res) => setCategories(res.data.data))
      .catch((error) => setCategories([]));
  };

  const getBrands = () => {
    const uri = `https://free-time-server.onrender.com/api/v1/brand`;
    axios
      .get(uri)
      .then((res) => setBrands(res.data.data))
      .catch((error) => setBrands([]));
  };
  // render
  useEffect(() => {
    getCategories();
    getBrands();
  }, []);
  let queryParams: any;
  const handleCategoryFilter = (checkbox: any) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      // @ts-ignore
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checked === false) {
      queryParams.delete(checkbox.name);
    } else {
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  const handleBrandFilter = (id: string) => {
    let queryParams: any;
    let path: string;
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    if (queryParams.has("brand")) {
      queryParams.set("brand", id);
    } else {
      queryParams.append("brand", id);
    }
    path = window.location.pathname + `?` + queryParams.toString();
    router.push(path);
  };

  const handlePriceFilter = () => {
    if (!minimum || !maximum) {
      return;
    }
    let queryParams: any;
    let path: string;
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    if (queryParams.has("maximum")) {
      queryParams.set("maximum", maximum);
    } else {
      queryParams.append("maximum", maximum);
    }
    if (queryParams.has("minimum")) {
      queryParams.set("minimum", minimum);
    } else {
      queryParams.append("minimum", minimum);
    }
    path = window.location.pathname + `?` + queryParams.toString();
    router.push(path);
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-cs-pink-200 p-7">
        <h1 className="text-2xl">CETAGORIES</h1>
        <div className=" flex flex-col gap-y-2 items-start mt-7">
          {categories?.map((category: Category_data_types) => (
            <label key={category._id} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                name="category"
                className="w-4 h-4 border-2 border-cs-black rounded-md "
                value={category._id}
                onClick={(e) => handleCategoryFilter(e.target)}
              />
              <span className="text-cs-black">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      <h1 className=" text-3xl font-oswoald font-light mt-10">BRANDS</h1>
      <div className=" grid grid-cols-2 gap-3 mt-10">
        {brands?.map((brand) => (
          <div
            onClick={() => handleBrandFilter(brand._id)}
            key={brand._id}
            className={`relative cursor-pointer w-full h-28 overflow-hidden ${
              queryBrand === brand._id && "broder border-2 border-cs-pink-800"
            }`}
          >
            <Image alt="" fill src={brand.logo} className="object-contain" />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h1 className=" text-3xl font-oswoald font-light">PRICE</h1>
        <div>
          <div className="mt-5">
            <p>Minimum value :</p>
            <input
              onChange={(e) => setMinimum(e.target.value)}
              value={minimum}
              placeholder="enter minimum price"
              className="border rounded-md px-3 py-3 mt-2"
            />
          </div>
          <div className="mt-5">
            <p>Maximum value :</p>
            <input
              onChange={(e) => setMaximum(e.target.value)}
              value={maximum}
              placeholder="enter maximum price"
              className="border rounded-md px-3 py-3 mt-2"
            />
          </div>
          <div className="flex gap-x-2">
            <button
              onClick={handlePriceFilter}
              className="bg-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 text-white mt-5"
            >
              filter
            </button>
            <button
              onClick={() => router.push("/shop")}
              className=" border-2 ease-in-out duration-300 border-cs-pink-800 px-4 py-2 rounded-md active:opacity-80 text-cs-pink-800 hover:bg-cs-pink-800 hover:text-white mt-5"
            >
              reset filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
