"use client";
import { MessageModal } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [categories, setCategories] = useState<any>();
  const [msg, setMsg] = useState();
  const [name, setName] = useState<string | undefined>();
  const router = useRouter();
  
  useEffect(() => {
    axios
      .get(`https://free-time-server.onrender.com/api/v1/category/${params.id}`)
      .then((res) => {
        setCategories(res.data.data)
        setName(res.data.data.name)
    })
      .catch((error) => {if(error.response.data.errorcode == 401){router.replace("/")}});
  });

  return (
    <div className="p-5">
      {msg && <MessageModal text={msg} setMsg={setMsg} />}
      <div>
        <div className="flex items-center gap-x-2">
          <p>Type: </p>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border px-4 py-1 rounded-md outline-none"
            defaultValue={name}
          />
          <button disabled={categories?.name == name ? true : false} className=" px-4 py-1 bg-cs-black text-white rounded-md focus:opacity-70">
            update
          </button>
        </div>
        <p className="mt-4 text-md">Id : {categories?._id}</p>
        <p className="mt-4 text-md">Create_by : {categories?.create_by}</p>
        <p className="mt-4 text-md">
          Products : {categories?.products?.length}
        </p>
        <p className="mt-4 text-md">Last update : {categories?.updatedAt}</p>
      </div>
      {categories?.products?.lenght > 0 && (
        <div className="mt-4 border rounded-md overflow-hidden">
          <div className="bg-cs-black grid grid-cols-4 p-2 text-white">
            <h2>Name</h2>
            <h2>Price</h2>
            <h2>Ratting</h2>
            <h2>Created At</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
