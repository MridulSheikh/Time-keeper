"use client";
import React, { useState } from "react";

export const ProccedToShipping = ({ total }: { total: number }) => {
  const [open, setIsopen] = useState();
  return (
    <>
      {/* <PaymentModal /> */}
      <div className=" bg-white rounded-md shadow-md font-semibold p-4">
        <p>Total : ${total}</p>
        <p className="text-xs font-light mt-1">
          Tax or shipping charge calculate at procced to shipping.{" "}
        </p>
        <button className=" bg-cs-pink-800 text-white py-2 rounded-md w-full mt-2 active:opacity-80">
          Procced to shipping
        </button>
      </div>
    </>
  );
};
