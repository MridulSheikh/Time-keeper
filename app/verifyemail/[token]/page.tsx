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
        .post(`http://localhost:5000/api/v1/user/confirm`,{}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + params?.token,
          },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setSuccess(true);
          }
        })
        .catch((error) => {
        })
        .finally(() => setLoading(false));
    }
  }, [params]);
  return (
    <div className="w-full h-96 flex justify-center items-center bg-cs-nural">
      {loading || !params?.token ? (
        <div className="text-center flex flex-col justify-center items-center  rounded-md p-4">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="100"
            visible={true}
          />
          <h1 className=" text-2xl font-bold text-green-500">
            Verifying your email !
          </h1>
        </div>
      ) : (
        <div>
          {success ? (
            <div className="text-center  rounded-md p-4">
              <BsCheck2Circle className=" text-7xl font-bold text-green-500 mx-auto" />
              <h1 className=" text-2xl font-bold text-green-500">
                successfully verified your email !
              </h1>
              <button
                className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80"
                onClick={() => router.replace("/")}
              >
                Back to home
              </button>
            </div>
          ) : (
            <div className="text-center  rounded-md p-4">
              <RiErrorWarningLine className=" text-7xl font-bold text-red-500 mx-auto" />
              <h1 className=" text-2xl font-bold text-red-500">
                Page not found!
              </h1>
              <button
                className="text-white bg-red-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80"
                onClick={() => router.replace("/verifyemail")}
              >
                back to home
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Success;
