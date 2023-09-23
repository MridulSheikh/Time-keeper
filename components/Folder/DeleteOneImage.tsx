"use client";
import React, { useState } from "react";
import { ConfirmModal } from "../ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

interface propsType {
  imageUrl: string;
  folder: string;
  id: string;
}

export const DeleteOneImage = ({ imageUrl, folder, id }: propsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth()
  console.log(id)
  console.log(imageUrl)
  const deleteImageshandler = () => {
    setIsLoading(true);
    const body = {
      imageUrl: imageUrl,
      folder: folder
    }
    axios
      .delete(`https://free-time-server.onrender.com/api/v1/image/${id}`, {
        data: body,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.errormessage);
        setIsOpen(false);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="w-full">
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        condition={"confirm"}
        action={deleteImageshandler}
        message={`Are you sure wan't to delete this image. Please type 'confirm' `}
        loading={isLoading}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-800 text-white p-1 rounded-sm hover:opacity-70 w-full"
      >
        Delete
      </button>
    </div>
  );
};
