"use client";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import VerifyEmail from "../Shared/VerifyEmail";
import { useRouter } from "next/navigation";

export const ProccedToShipping = ({ total }: { total: number }) => {
  const [open, setIsopen] = useState();
  const {user} = useAuth()
  const router = useRouter()
  return (
    <>
      {/* <PaymentModal /> */}
      <div className=" bg-white rounded-md shadow-md font-semibold p-4">
        <p>Total : ${total}</p>
        <p className="text-xs font-light mt-1">
          Tax or shipping charge calculate at procced to shipping.{" "}
        </p>
        {
          user?.verified ? <button onClick={()=>router.push('/shipping')} className=" bg-cs-pink-800 text-white py-2 rounded-md w-full mt-2 active:opacity-80">
          Procced to shipping
        </button>
        :
        <VerifyEmail />
        }
      </div>
    </>
  );
};
