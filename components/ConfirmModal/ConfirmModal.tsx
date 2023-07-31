"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "../Modal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

interface PropsType {
  isOpen: any;
  setIsOpen: any;
  condition: string;
  message: string;
  action: any;
  loading: boolean;
}

type Inputs = {
  name: string;
};

export const ConfirmModal = ({
  isOpen,
  setIsOpen,
  condition,
  message,
  action,
  loading,
}: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.name === condition) {
      action();
    } else {
      return;
    }
  };
  return (
    <div>
      {isOpen && (
        <Modal>
          <div className="bg-white p-7 rounded-md border w-96 relative">
            <div
              onClick={() => setIsOpen(false)}
              className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
            >
              X
            </div>
            {loading ? (
              <div className="flex justify-center items-center gap-x-2">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
                <h1>Please wait</h1>
              </div>
            ) : (
              <div>
                <p>{message}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-md border"
                    placeholder={condition}
                  />
                </form>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
