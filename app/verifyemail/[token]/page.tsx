"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";

const Success = ({ params }: { params: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (params?.token) {
      setLoading(true);
      axios
        .post(
          `https://free-time-server.onrender.com/api/v1/user/confirm`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + " " + params?.token,
            },
          }
        )
        .then((res) => {
          if (res.data.status === "success") {
            setSuccess(true);
          }
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  }, [params]);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-cs-nural">
      {loading || !params?.token ? (
        <div className="text-center flex flex-col justify-center items-center  rounded-md p-4">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="100"
            visible={true}
          />
          <h1 className=" text-2xl font-bold text-green-500">Please wait</h1>
        </div>
      ) : (
        <div>
          {success ? (
            <div className="text-center  rounded-md p-4">
              <BsCheck2Circle className=" text-7xl font-bold text-green-500 mx-auto" />
              <h1 className=" text-2xl font-bold text-green-500">
                successfully verified your email !
              </h1>
            </div>
          ) : (
            <div className="text-center  rounded-md p-4">
              <h1 className=" text-7xl font-bold text-red-500 mx-auto">4O4</h1>
              <h1 className=" text-2xl font-bold text-red-500">
                Page not found!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Success;
