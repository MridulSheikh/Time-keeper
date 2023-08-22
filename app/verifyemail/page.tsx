"use client";
import { PrivateRoute } from "@/components";
import VerifyEmail from "@/components/Shared/VerifyEmail";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosWarning } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";

const SendEmailForVerify = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <PrivateRoute>
      <div className="w-full h-96 flex justify-center items-center bg-cs-nural">
        {user?.verified ? (
          <div className="text-center rounded-md p-4">
            <MdVerifiedUser className=" text-7xl font-bold text-green-500 mx-auto" />
            <h1 className=" text-2xl font-bold text-green-500">
              Your email address Already verified !
            </h1>
            <button
              className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80"
              onClick={() => router.replace("/")}
            >
              home
            </button>
          </div>
        ) : (
          <div className="text-center rounded-md p-4">
             <IoIosWarning className=" text-7xl font-bold text-yellow-500 mx-auto" />
            <h1 className=" text-2xl font-bold text-yellow-500">
              Your email is not verified!
            </h1>
            <VerifyEmail />
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default SendEmailForVerify;
