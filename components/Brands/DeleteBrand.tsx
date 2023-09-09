"use client";
import React, { useState } from "react";
import { ConfirmModal } from "../ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import useAuth from "@/hooks/useAuth";

export const DeleteBrand = ({ id, name}: {id : string , name : string}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token} = useAuth()
  const deletBrandHandaler = () =>{
        setIsLoading(true)
        axios.delete(`https://free-time-server.onrender.com/api/v1/Brand/${id}`,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        })
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
      <button onClick={() => setIsOpen(true)} className="w-full p-2 text-sm rounded-md bg-red-800 text-white active:opacity-50">
        <AiFillDelete />
      </button>
    </div>
  );
};