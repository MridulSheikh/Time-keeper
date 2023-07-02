"use client"
import React from "react";
import { Modal } from "../Modal";
import { RotatingLines } from "react-loader-spinner";

export const LoadingModal = () => {
  return (
    <Modal>
      <div className="bg-white border p-5 rounded-md flex items-center gap-x-3 cursor-wait">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
        <p>loading....</p>
      </div>
    </Modal>
  );
};
