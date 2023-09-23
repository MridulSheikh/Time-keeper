'use client'
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Modal } from '../Modal';

type Inputs = {
    name: string;
  };
  
  const RenameFolderForm = ({ condition, setCondition, id, name }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
      };
      axios
        .patch(`https://free-time-server.onrender.com/api/v1/image/${id}`, body,{
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
          toast.error(error.response.data.errormessage);
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
                  <p>Rename Image</p>
                  {errors.name && (
                    <p className="text-sm text-red-700 mt-2">
                      {errors.name.message}
                    </p>
                  )}
                  <input
                    {...register("name", {
                      required: "Please provide a name",
                    })}
                    type="text"
                    className="border px-4 py-2 w-full rounded-md mt-2"
                    placeholder={name}
                  />
                </form>
              )}
            </div>
          </Modal>
        )}
      </div>
    );
  };

export const RenameImage = ({id, name} : {id : string, name : string}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full'>
    <RenameFolderForm condition={isOpen} setCondition={setIsOpen} id={id} name={name} />
    <button onClick={() => setIsOpen(true)} className="bg-blue-800 text-white p-1 rounded-sm hover:opacity-70 w-full">
      Rename
    </button>
  </div>
  )
}
