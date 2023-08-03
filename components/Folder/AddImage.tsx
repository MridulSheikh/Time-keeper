"use client";
import React, { useRef, useState } from "react";
import { Modal } from "../Modal";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface propsType {
  id: string;
}

type Inputs = {
  name: string;
};

const UploadImageModal = ({
  folder,
  setCondition,
}: {
  folder: string;
  setCondition: any;
}) => {
  const [file, setFile] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [fileError, setFileError] = useState<string | null>();
  const toastId = useRef<any>(null);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!file) {
      setFileError("Please Upload a Image");
      return;
    }
    setCondition(false);
    toastId.current = toast.loading("uploading image...");
    const body = {
      name: data.name,
      create_by: user.email,
      folder: folder,
    };
    const fromData = new FormData();
    fromData.append("image", file);
    fromData.append("data", JSON.stringify(body));
    axios
      .post(`http://localhost:5000/api/v1/image`, fromData)
      .then((res) => {
        toast.update(toastId.current, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.errormessage,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };
  const imagePreviewhandler = (e: any) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setFileError(null);
    }
  };
  return (
    <div>
      <Modal>
        <div className="bg-white p-5 rounded-md border relative w-96 ">
          <div
            onClick={() => setCondition(false)}
            className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
          >
            X
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>name*</p>
              {errors.name && (
                <p className="text-sm text-red-700 mt-2">
                  {errors.name.message}
                </p>
              )}
              <input
                {...register("name", { required: "Please Enter Name" })}
                type="text"
                className="border px-4 py-2 w-full rounded-md mt-2"
                placeholder="image"
              />
            </div>
            <div className="mt-5">
              <p>Choose Image*</p>
              {file && (
                <div className="w-full h-40 relative mt-2">
                  <Image
                    alt={"image"}
                    src={previewImage}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {fileError && (
                <p className="text-sm text-red-700 mt-2">{fileError}</p>
              )}
              <input
                onChange={imagePreviewhandler}
                type="file"
                className="border px-4 py-2 w-full rounded-md mt-2"
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <button className=" bg-cs-black text-white py-2 w-full rounded-md mt-5 focus:opacity-60">
              Upload
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export const AddImage = ({ id }: propsType) => {
  const [condition, setCondition] = useState(false);
  return (
    <div>
      {condition && (
        <UploadImageModal folder={id} setCondition={setCondition} />
      )}
      <button
        onClick={() => setCondition(true)}
        className="bg-white p-1 rounded-sm hover:opacity-70"
      >
        Upload Image
      </button>
      <ToastContainer />
    </div>
  );
};
