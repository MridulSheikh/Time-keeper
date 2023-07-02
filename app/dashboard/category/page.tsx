import Link from "next/link";
import React from "react";

const fake_category_data = [
  {
    type: "men",
    product: 43,
    create_by: "mridul@gmail.com"
  },
  {
    type: "women",
    product: 43,
    create_by: "mridul@gmail.com"
  },
  {
    type: "luxury",
    product: 43,
    create_by: "mridul@gmail.com"
  },
];

const page = () => {
  const category = true;
  return (
    <div className="p-5">
      <h1 className=" text-xl font-bold text-cs-black">Add Category</h1>
      <form className="flex gap-x-2 items-center mt-3">
        <input
          type="text"
          placeholder="add category type"
          className="px-3 py-2 h-full border border-cs-black rounded-md focus:outline-cs-pink-800"
        />
        <button className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md">
          add
        </button>
      </form>
      <div className="mt-4 border rounded-md overflow-hidden">
        <div className="bg-cs-black grid grid-cols-4 p-2 text-white">
          <h2>Type</h2>
          <h2>Product</h2>
          <h2>Create by</h2>
          <h2>Action</h2>
        </div>
        {!category ? (
          <div className="py-10 flex justify-center items-center text-cs-black/40">
            <h1>You haven&apos;t add any category</h1>
          </div>
        ) : (
          <div>
            {
              fake_category_data.map(k => <div key={k.type} className="text-cs-black grid grid-cols-4 p-2 border-b">
              <h2>{k.type}</h2>
              <h2>{k.product}</h2>
              <h2>{k.create_by}</h2>
              <div className="flex gap-x-2">
                <button className="bg-red-800 text-white p-1 rounded-sm hover:opacity-70">Delete</button>
                <button className="bg-green-800 text-white p-1 rounded-sm hover:opacity-70">Details</button>
              </div>
            </div>)
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
