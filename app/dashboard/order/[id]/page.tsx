'use client'
import React, { ReactEventHandler, useRef } from 'react'
import formatDate from "../../../../lib/DateFormate"
import { OrderProducts } from '@/components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import useAuth from '@/hooks/useAuth'

const getData = async (url : string) => {
  const res = await fetch(url, {cache : "no-cache"})
  return res.json()
}

const OrderDetails = async ({params} : {params : {id : string}}) => {
  const {token} = useAuth()
  const toastId = useRef<any>(null);
  const order = await getData(`http://localhost:5000/api/v1/order/${params?.id}`)
  const handleChangeStatus = (e : any) => {
        toastId.current = toast.loading("please wait...");
        axios.patch(`http://localhost:5000/api/v1/order/${params?.id}`,{status : e.target.value},{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        })
        .then(res => {
          toast.update(toastId.current, {
            render: "sucessfully update staus",
            type: "success",
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            autoClose: 6000,
          });
        })
        .catch(err =>{
          toast.update(toastId.current, {
            render: "please try again",
            type: "error",
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            autoClose: 6000,
          });
        })
  }
  return (
    <div>
      <ToastContainer />
      <div className='px-5 py-2 bg-white border-b sticky top-0'>
        <h1 className='text-xl text-cs-black font-semibold'>Order Details</h1>
      </div>
      <div className='m-5'>
        <div className='p-5 rounded-md border bg-white grid grid-cols-2 gap-7'>
          <div>
            <h1 className='font-bold text-xl'>Date</h1>
            <p className='mt-2 text-gray-600'>{formatDate(order.data.createdAt)}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Order Id</h1>
            <p className='mt-2 text-gray-600'>{order.data._id}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Total</h1>
            <p className='mt-2 text-gray-600'>${order.data.total}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Confirm</h1>
            <p className='mt-2 text-gray-600'>{order.data.confirm ? 'yes' : 'No'}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Paid</h1>
            <p className='mt-2 text-gray-600'>{order.data.paid ? 'yes' : 'No'}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Status</h1>
            <select onChange={handleChangeStatus} name="status" className='border px-2 py-1 rounded-sm'>
              <option value="pending" selected={order.data.status === "pending"}>pending</option>
              <option value="shipped" selected={order.data.status === "shipped"}>shipped</option>
              <option value="delivered" selected={order.data.status === "delivered"}>delivered</option>
              <option value="packed" selected={order.data.status === "packed"}>packed</option>
              <option value="cancel" selected={order.data.status === "cancel"}>cancel</option>
            </select>
          </div>
        </div>
        <div className='p-5 rounded-md border bg-white grid grid-cols-2 gap-7 mt-5'>
          <div>
            <h1 className='font-bold text-xl'>Country</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.country}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Number</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.number}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>State</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.state}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Post</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.post}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Email</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.email}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl'>Address one line</h1>
            <p className='mt-2 text-gray-600'>{order.data.address.address_1_line}</p>
          </div>
        </div>
        <OrderProducts items={order.data.item} total={order.data.total} />
        <div>
          
        </div>
      </div>

    </div>
  )
}

export default OrderDetails