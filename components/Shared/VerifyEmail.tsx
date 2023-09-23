'use client'
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const VerifyEmail = () => {
    const {user, token} = useAuth()
    const toastId = useRef<any>(null);
    const handlerequest = () =>{
        toastId.current = toast.loading("please wait...");
         axios.post(`https://free-time-server.onrender.com/api/v1/user/verify/${user.email}`).then(res => {
            toast.update(toastId.current, {
                render: res.data.message,
                type: "success",
                isLoading: false,
                closeButton: true,
                closeOnClick: true,
                autoClose: 6000,
              });
         }).catch(error=>{
           console.log(error)
            toast.update(toastId.current, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                closeButton: true,
                closeOnClick: true,
                autoClose: 6000,
              });
         })
    }
  return (
    <>
    <ToastContainer />
    <button
      onClick={handlerequest}
      className=" w-full text-white py-1 mt-4 px-2 rounded-md bg-yellow-500"
    >
      verify email
    </button>
    </>
  );
};

export default VerifyEmail;
