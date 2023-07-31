"use client";
import React, { useState } from "react";
import { Modal } from "../Modal";
import { RiImageAddLine } from "react-icons/ri";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  number: string;
};

const AddBrandLogo = () => {
  return (
    <div className="mt-2">
      <div className="w-full h-40 flex justify-center items-center border border-dashed rounded-md cursor-pointer hover:bg-slate-300">
        <h1 className="text-4xl text-cs-black/60">
          <RiImageAddLine />
        </h1>
      </div>
    </div>
  );
};

const AddBrandFrom = ({ isOpen, setIsOpen }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="p-7 rounded-md border bg-white relative w-80">
      <div
        onClick={() => setIsOpen(false)}
        className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
      >
        X
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Name*</p>
          {
            errors.name && <p className="text-sm text-red-800 pt-1">{errors.name.message}</p>
          }
          <input
            {...register("name", { required: "Please provide brand name" })}
            type="text"
            className="border rounded-md px-5 py-2 w-full mt-2"
            placeholder="Enter the Brand Name"
          />
        </div>
        <div className="mt-5">
          <p>Supplier Number*</p>
          {
            errors.number && <p className="text-sm text-red-800 pt-1">{errors.number.message}</p>
          }
          <input
          {...register("number", { required: "Please provide supplier number" })}
            type="text"
            className="border rounded-md px-5 py-2 w-full mt-2"
            placeholder="Enter the supllier Number"
          />
        </div>
        <div className="mt-5">
          <p>Brand Logo*</p>
          <AddBrandLogo />
        </div>
        <button className="w-full py-2 rounded-md bg-cs-black text-white mt-5">
          Save
        </button>
      </form>
    </div>
  );
};

export const AddBrand = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <>
      {isOpen && (
        <Modal>
          <AddBrandFrom isOpen={isOpen} setIsOpen={setIsOpen} />
        </Modal>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md"
      >
        Add Brand
      </button>
    </>
  );
};
