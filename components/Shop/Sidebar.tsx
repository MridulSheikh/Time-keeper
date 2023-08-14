"use client";
import brand_mock_data from "@/mockdata/BRAND_MOCK_DATA";
import { Brand_data_types, Category_data_types } from "@/typedeclaration/types";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

export const Sidebar = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category_data_types[]>();
  const [brands, setBrands] = useState<Brand_data_types[]>();

  // get categories data
  const getCategories = () => {
    const uri = `http://localhost:5000/api/v1/category`;
    axios
      .get(uri)
      .then((res) => setCategories(res.data.data))
      .catch((error) => setCategories([]));
  };

  // render
  useEffect(() => {
    getCategories();
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
        {/* {brands?.map((brand) => (
          <div></div>
        ))} */}
      </div>
    </div>
  );
};
