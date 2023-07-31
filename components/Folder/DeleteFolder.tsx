"use client";
import React, { useState } from "react";
import { ConfirmModal } from "../ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteFolder = ({ id, name }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deletFolderHandaler = () =>{
        setIsLoading(true)
        axios.delete(`http://localhost:5000/api/v1/folder/${id}`)
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
      <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} condition={name} action={deletFolderHandaler} message={`Are you sure wan't to delete this folder.Please type '${name}' `} loading={isLoading} />
      <button onClick={() => setIsOpen(true)} className="bg-red-800 text-white p-1 rounded-sm hover:opacity-70">
        Delete
      </button>
    </div>
  );
};