'use client'
import { ManageOrderCard, ManageOrderHeader } from '@/components'
import useAuth from '@/hooks/useAuth'
import { Order_data_types } from '@/typedeclaration/types'
import queryString from 'query-string'
import React from 'react'

const getData = async (url : string, token : string) => {
  const res = await fetch(url, {cache : "no-cache", headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer" + " " + token,
  }})
  return res.json()
}

const Order = async ({searchParams} : {searchParams : any}) => {
  const {token} = useAuth()
  const queryParmas = {
        status : searchParams.status
  }
  const searchQuery = queryString.stringify(queryParmas);
  const orders = await getData(`https://free-time-server.onrender.com/api/v1/order?${searchQuery}`, token)
  return (
    <div>
        <ManageOrderHeader />
        <div className='mt-5'>
            {
              orders?.data ? 
              <div>
                {
                  orders?.data.map((order : Order_data_types) => <ManageOrderCard key={order._id} _id={order._id} date={order.createdAt} item={order.item.length}paid={order.paid} confirmed={order.confirm} price={order.total} status={order.status}  />)
                }
              </div>
              :
              <div className=' w-full h-96 flex justify-center items-center'>
                  <div>
                    <h1 className=' text-xl text-gray-500'>Order not found!</h1>
                  </div>
              </div>
            }
        </div>
    </div>
  )
}

export default Order