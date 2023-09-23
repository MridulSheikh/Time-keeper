"use client";
import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import formatDate from "../../../../lib/DateFormate";
import { OrderProducts } from "@/components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";

const OrderDetails = ({ params }: { params: { id: string } }) => {
  const { token } = useAuth();
  const toastId = useRef<any>(null);
  const [order, setOrder] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = () => {
    setIsLoading(true);
    axios
      .get(`https://free-time-server.onrender.com/api/v1/order/${params?.id}`)
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getOrder();
  }, []);
  const handleChangeStatus = (e: any) => {
    toastId.current = toast.loading("please wait...");
    axios
      .patch(
        `https://free-time-server.onrender.com/api/v1/order/${params?.id}`,
        { status: e.target.value },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        }
      )
      .then((res) => {
        toast.update(toastId.current, {
          render: "sucessfully update staus",
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((err) => {
        toast.update(toastId.current, {
          render: "please try again",
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };
  return isLoading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    </div>
  ) : (
    <div>
      <ToastContainer />
      <div className="px-5 py-2 bg-white border-b sticky top-0">
        <h1 className="text-xl text-cs-black font-semibold">Order Details</h1>
      </div>
      <div className="m-5">
        <div className="p-5 rounded-md border bg-white grid grid-cols-2 gap-7">
          <div>
            <h1 className="font-bold text-xl">Date</h1>
            <p className="mt-2 text-gray-600">{formatDate(order?.createdAt)}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Order Id</h1>
            <p className="mt-2 text-gray-600">{order?._id}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Total</h1>
            <p className="mt-2 text-gray-600">${order?.total}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Confirm</h1>
            <p className="mt-2 text-gray-600">
              {order?.confirm ? "yes" : "No"}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Paid</h1>
            <p className="mt-2 text-gray-600">{order?.paid ? "yes" : "No"}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Status</h1>
            <select
              onChange={handleChangeStatus}
              name="status"
              className="border px-2 py-1 rounded-sm"
            >
              <option value="pending" selected={order?.status === "pending"}>
                pending
              </option>
              <option value="shipped" selected={order?.status === "shipped"}>
                shipped
              </option>
              <option
                value="delivered"
                selected={order?.status === "delivered"}
              >
                delivered
              </option>
              <option value="packed" selected={order?.status === "packed"}>
                packed
              </option>
              <option value="cancel" selected={order?.status === "cancel"}>
                cancel
              </option>
            </select>
          </div>
        </div>
        <div className="p-5 rounded-md border bg-white grid grid-cols-2 gap-7 mt-5">
          <div>
            <h1 className="font-bold text-xl">Country</h1>
            <p className="mt-2 text-gray-600">{order?.address.country}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Number</h1>
            <p className="mt-2 text-gray-600">{order?.address.number}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">State</h1>
            <p className="mt-2 text-gray-600">{order?.address.state}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Post</h1>
            <p className="mt-2 text-gray-600">{order?.address.post}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Email</h1>
            <p className="mt-2 text-gray-600">{order?.address.email}</p>
          </div>
          <div>
            <h1 className="font-bold text-xl">Address one line</h1>
            <p className="mt-2 text-gray-600">
              {order?.address.address_1_line}
            </p>
          </div>
        </div>
        <OrderProducts items={order?.item} total={order?.total} />
        <div></div>
      </div>
    </div>
  );
};

export default OrderDetails;
