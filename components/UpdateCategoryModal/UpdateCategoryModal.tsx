"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
};

const UpdateModal = ({ name, id, setIsOpen }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    axios
      .patch("http://localhost:5000/api/v1/category", {
        id: id,
        name: data.name,
      })
      .then((res) => {
        toast.success(res.data.message)
        setIsOpen(false)
      })
      .catch((err) =>  {
        toast.error(err.response.data.errormessage)
        setIsOpen(false)
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal>
      
        <div className="bg-white border rounded-md p-7 w-96 relative">
          <button
            onClick={() => setIsOpen(false)}
            className=" w-8 h-8 bg-red-800 rounded-full absolute -top-4 -right-4 text-white"
          >
            X
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="mt-3">
                If you change this category name. Your products may change
              </p>
              <input
                type="text"
                className="px-5 py-2 w-full outline-none border rounded-md mt-4"
                placeholder={name}
                {...register("name", { required: "This field is required" })}
              />
            </div>
            {isLoading ? (
              <button
                disabled
                className="bg-green-800 opacity-50 text-white p-1 rounded-md mt-5 hover:opacity-70 flex justify-center items-center gap-x-4"
              >
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
                <p>updating</p>
              </button>
            ) : (
              <button className="bg-green-800 text-white p-1 rounded-md mt-5 hover:opacity-70">
                Change
              </button>
            )}
          </form>
        </div>
    </Modal>
  );
};

export const UpdateCategoryModal = ({ name, id }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen && <UpdateModal setIsOpen={setIsOpen} name={name} id={id} />}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-800 text-white p-1 rounded-sm hover:opacity-70"
      >
        Change name
      </button>
    </div>
  );
};
