'use client'
import { Category_data_types } from "@/typedeclaration/types";
import React, { useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { LoadingModal } from "../LoadingModal";
import { useRouter } from "next/navigation";
import { UpdateCategoryModal } from "../UpdateCategoryModal";
import {toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";



const CategoryCard = ({id, name, product, create_by,setCategory, category} : any) => {
  const {token} = useAuth();
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setIsLoading(true)
    axios.delete(`https://free-time-server.onrender.com/api/v1/category/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token,
      },
    })
    .then(res => {
      toast.success(res.data.message)
      setIsopen(false)
      const filterCategory = category?.filter((ct:any) => ct._id != id)
      setCategory(filterCategory);
    })
    .catch(error => {
      toast.error(error.response.data.message)
      setIsopen(false)
    })
    .finally(() => {
        setIsLoading(false)
        setIsopen(false)
    })
  }

  return (
    <div>
        {isOpen && (
        <Modal>
          <div className="p-5 rounded-md bg-white">
            <h1>If you delete this category. Your products may change</h1>
            <div className="flex gap-x-3 mt-4">
                <button onClick={()=>setIsopen(false)} className="bg-red-500 px-3 py-1 text-white rounded-md active:opacity-70">cancel</button>
                <button onClick={handleDelete} className="bg-cs-black px-3 py-1 text-white rounded-md active:opacity-70">confirm</button>
            </div>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingModal />}
      <div key={id} className="text-cs-black grid grid-cols-4 p-2 border-b">
      <h2>{name}</h2>
      <h2>{product?.length}</h2>
      <h2>{create_by}</h2>
      <div className="flex gap-x-2">
        <button
          onClick={() => setIsopen(true)}
          className="bg-red-800 text-white p-1 rounded-sm hover:opacity-70"
        >
          Delete
        </button>
        <button onClick={()=>router.push(`/dashboard/category/${id}`)} className="bg-green-800 text-white p-1 rounded-sm hover:opacity-70">
          Details
        </button>
        <UpdateCategoryModal name={name} id={id} />
      </div>
    </div>
    </div>
  );
};

export default CategoryCard;
