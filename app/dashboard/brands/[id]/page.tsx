"use client";
import { LoadingModal, MessageModal } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [brand, setBrand] = useState<any>();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | false>(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://free-time-server.onrender.com/api/v1/brand/${params.id}`)
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((error) => {
        if (error.response.data.errorcode == 401) {
          router.replace("/");
        }
      });
  });
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Brand / {brand?.name}</h1>
      <div className="mt-4 border rounded-md overflow-hidden bg-white">
        <div className="bg-cs-black grid grid-cols-6 p-2 text-white">
          <h2>Img</h2>
          <h2 className="col-span-3">Title</h2>
          <h2>Category</h2>
          <h2>Price</h2>
        </div>
        <div className="grid grid-cols-6 p-2 text-cs-black">
          <h2>Img</h2>
          <h2 className="col-span-3">Title</h2>
          <h2>Category</h2>
          <h2>Price</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
