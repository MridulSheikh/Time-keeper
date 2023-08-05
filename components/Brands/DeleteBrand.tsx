"use client";
import React, { useState } from "react";
import { ConfirmModal } from "../ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteBrand = ({ id, name}: {id : string , name : string}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deletBrandHandaler = () =>{
        setIsLoading(true)
        axios.delete(`http://localhost:5000/api/v1/Brand/${id}`)
        .then(res => {
            toast.success(res.data.message)
            setIsOpen(false)
        })
        .catch(error => {
            toast.error(error.response.data.errormessage);
            setIsOpen(false)
        })
        .finally(() => setIsLoading(false))
  }
  return (
    <div>
      <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} condition={name} action={deletBrandHandaler} message={`Are you sure want to delete this Brand. Please type '${name}' `} loading={isLoading} />
      <button onClick={() => setIsOpen(true)} className="w-full py-1 px-4 text-sm rounded-md bg-red-800 text-white active:opacity-50">
        Delete
      </button>
    </div>
  );
};