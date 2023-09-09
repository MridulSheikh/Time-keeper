"use client";
import React, { useState } from "react";
import { Modal } from "../Modal";
import { RotatingLines } from "react-loader-spinner";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { string } from "yup";
import { SetImageContainer } from "./AddBrand";

type Inputs = {
  name: string;
  number: string;
};

const UpdateBrandForm = ({
  condition,
  setCondition,
  id,
  name,
  logo,
  number,
}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<null | string | undefined>(logo);
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    const body = {
      name: data.name,
      create_by: user?.email,
      number: data.number,
      logo: image,
    };
    axios
      .patch(`https://free-time-server.onrender.com/api/v1/brand/${id}`, body,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setCondition(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setCondition(false);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div>
      {condition && (
        <Modal>
          <div className="bg-white p-5 rounded-md border relative w-96 ">
            <div
              onClick={() => setCondition(false)}
              className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
            >
              X
            </div>
            {isLoading ? (
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <p>name*</p>
                  {errors.name && (
                    <p className="text-sm text-red-700 mt-2">
                      {errors.name.message}
                    </p>
                  )}
                  <input
                    {...register("name", {
                      required: "Please provide brand name",
                    })}
                    type="text"
                    className="border px-4 py-2 w-full rounded-md mt-2"
                    placeholder={name}
                    defaultValue={name}
                  />
                </div>
                <div className="mt-5">
                  <p>supplier number*</p>
                  {errors.number && (
                    <p className="text-sm text-red-700 mt-2">
                      {errors.number.message}
                    </p>
                  )}
                  <input
                    {...register("number", {
                      required: "Please provide spplier number",
                    })}
                    type="text"
                    className="border px-4 py-2 w-full rounded-md mt-2"
                    placeholder={"+880 1XXXXXXXX"}
                    defaultValue={number}
                  />
                </div>
                <div className="mt-5">
                  <p>brand logo*</p>
                  <div className="w-full h-40">
                    <SetImageContainer
                      setImageUrl={setImage}
                      imageUrl={image}
                    />
                  </div>
                </div>
                <button className=" bg-cs-black py-2 text-white rounded-md active:opacity-80 w-full mt-5">
                  update
                </button>
              </form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export const UpadteBrand = ({ id, name, logo, number }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <UpdateBrandForm
        condition={isOpen}
        setCondition={setIsOpen}
        id={id}
        name={name}
        logo={logo}
        number={number}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-1 text-sm rounded-md px-4 bg-blue-800 text-white active:opacity-50"
      >
        update
      </button>
    </div>
  );
};
