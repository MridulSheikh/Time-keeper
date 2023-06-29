import Link from "next/link";
import React from "react";

const page = () => {
  const category = false;
  return (
    <div>
      <div className="bg-cs-black grid grid-cols-4 p-2 text-white">
        <h2>Type</h2>
        <h2>Product</h2>
        <h2>Create by</h2>
        <h2>Action</h2>
      </div>
    </div>
  );
};

export default page;
