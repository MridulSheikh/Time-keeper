import { AddProduct } from "@/components";
import Link from "next/link";
import React from "react";
import {BiCheckbox} from "react-icons/bi"
import {GrRefresh} from "react-icons/gr"

const page = () => {
  return (
    <div>
      <div className="bg-cs-black text-white px-5 py-2 flex justify-between items-center sticky top-0">
        <h1 className=" text-xl">Product</h1>
        <div className=" flex items-center gap-x-3">
          <AddProduct />
          <button className="bg-blue-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2">
          <GrRefresh className=" text-white text-xl" />
            <p>Refresh</p>
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-6 px-5 py-2 bg-cs-nural border-b sticky top-0 -z-10">
          <div className=" col-span-3 flex justify-start gap-x-2 items-center">
            <button className="text-xl"><BiCheckbox /></button>
            <h1>Name</h1>
          </div>
          <Link href={'/'}>
              <h1>Category</h1>
          </Link>
          <Link href={'/'}>
              <h1>Brand</h1>
          </Link>
          <Link href={'/'}>
              <h1>Price</h1>
          </Link>
      </div>
    </div>
  );
};

export default page;
