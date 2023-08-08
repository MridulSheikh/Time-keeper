'use client'
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { ConfirmModal } from '../ConfirmModal'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DeletProduct = ({selectItem} : {selectItem : any}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const deleteProduct = () => {
        setIsLoading(true)
        axios.delete(`http://localhost:5000/api/v1/product`, {data :{item  : selectItem}})
        .then(res => {
            toast.success(res.data.message)
            console.log(res.data)
            setIsOpen(false)
        })
        .catch(error => {
            toast.error(error.response.data.errormessage);
            setIsOpen(false)
        })
        .finally(() => setIsLoading(false))
    }
  return (
    <div className='text-cs-black'>
        <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} condition={"confirm"} action={deleteProduct} message={`Are you sure want to delete ${selectItem?.length} product. Please type '${'confirm'}' `} loading={isLoading} />
        <button onClick={() => setIsOpen(true)} className="bg-red-800 py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2">
              <AiOutlineDelete className=" text-white text-xl" />
              <p className='text-white'>delete {selectItem?.length} item</p>
        </button>
    </div>
  )
}
