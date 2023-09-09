'use client'
import useAuth from '@/hooks/useAuth';
import axios from 'axios'
import React, { useRef } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

interface propsType {
    item : number;
    total : number;
    _id : string;
    country : string;
    number : string;
    state : string;
    post : string;
    email : string;
    address_1_line : string;
}

export const VerifyOrder = ({_id, total, item, country, number, state, post, email, address_1_line} : propsType ) => {
    const toastId = useRef<any>(null);
    const {token} = useAuth()
    // send request for verification email
    const sendRequiest = () => {
        toastId.current = toast.loading("please wait...");
        const body = {
            item : item,
            total : total,
            id : _id,
            address: {
                country: country,
                number: number,
                state:  state,
                post:   post,
                email:  email,
                address_1_line: address_1_line,
              },
        }
        axios.post(`https://free-time-server.onrender.com/api/v1/order/verify`,body,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token,
      },
    })
    .then((res)=>{
      toast.update(toastId.current, {
        render: "please check your email to confirm your order",
        type: "success",
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 6000,
      });
    }).catch(error => {
        console.log(error)
      toast.update(toastId.current, {
        render: "Email not send, please try again",
        type: "error",
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 6000,
      });
    })
    }
  return (
    <div className=" h-96 flex items-center justify-center">
      <ToastContainer />
      <div className="text-center  rounded-md p-4">
        <RiErrorWarningLine className=" text-7xl font-bold text-yellow-500 mx-auto" />
        <h1 className=" text-2xl font-bold text-yellow-500">Please confirm your order!</h1>
          <button onClick={sendRequiest} className="text-white bg-yellow-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80">
            send confirmation mail
          </button>
      </div>
    </div>
  )
}
