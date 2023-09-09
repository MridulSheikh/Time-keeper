"use client";
import { Nav, PrivateRoute, TopBanner } from "@/components";
import { Footer } from "@/components/Footer";
import useAuth from "@/hooks/useAuth";
import formatDate from "@/lib/DateFormate";
import { Order_data_types } from "@/typedeclaration/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface propsTypes {
  _id : string;
  date : string;
  total : number;
  items : number;
  confirmed : boolean;
  pay : boolean;
}

const OrderRow = ({_id, date, total, items, confirmed, pay} : propsTypes) => {
  return(
    <div className="grid grid-cols-6 p-3 bg-white border-b border-x">
          <h1>{formatDate(date)}</h1>
          <h1>${total}</h1>
          <h1>{items}</h1>
          <h1>{confirmed ? "yes" : "not"}</h1>
          <h1>{pay ? "yes" : "not"}</h1>
          <Link href={`/order/${_id}`}>
            <button className=" bg-cs-pink-800 px-3 rounded-sm hover:underline">view more</button>
          </Link>
    </div>
  )
}

const Order = () => {
  const [orders, setOrders] = useState<undefined | Order_data_types[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {user} = useAuth()
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/order?email=${user?.email}`)
      .then((res) => setOrders(res.data.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [user]);
  return (
    <PrivateRoute>
      <Nav />
      <TopBanner page="order" route="home/order" />
      <div className="bg-cs-nural">
      <div className=" max-w-screen-xl mx-auto px-4  py-5">
        <div className=" grid grid-cols-6 bg-cs-pink-800 p-4 rounded-t-md text-white">
          <h1>Date</h1>
          <h1>Total</h1>
          <h1>Items</h1>
          <h1>Confirmed</h1>
          <h1>Pay</h1>
          <h1>View</h1>
        </div>
        <div>
          {isLoading ? (
            <div>
              <div className="relative space-y-5 overflow-hidden rounded-md p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
                <div className="h-5 rounded-full bg-cs-pink-800"></div>
                <div className="h-5 rounded-full bg-cs-pink-800"></div>
                <div className="h-5 rounded-full bg-cs-pink-800"></div>
              </div>
            </div>
          ) : (
            <div>
              {
                 orders?.map(order => <OrderRow _id={order._id} key={order._id} date={order.createdAt} total={order.total} items={order.item.length} confirmed={order.confirm} pay={order.paid} /> )
              }
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </PrivateRoute>
  );
};

export default Order;
