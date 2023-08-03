import { AddBrand } from "@/components";
import React from "react";

const Brand = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Brands</h1>
        <div className="flex space-x-3 items-center">
          <AddBrand />
          <button className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md">
            Refresh
          </button>
        </div>
      </div>
      <div className="mt-4 border rounded-md overflow-hidden bg-white">
        <div className="bg-cs-black grid grid-cols-5 p-2 text-white">
          <h2 className="col-span-2">Name</h2>
          <h2>Product</h2>
          <h2>Supplier Number</h2>
          <h2>Action</h2>
        </div>
      </div>
    </div>
  );
};

export default Brand;
