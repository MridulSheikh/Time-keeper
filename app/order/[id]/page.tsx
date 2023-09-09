import { BillingAddress, OrderProducts, PayOrder, PrivateRoute, TopBanner, TrackOrder } from "@/components";
import { VerifyOrder } from "@/components/OrderDetails/VerifyOrder";
import Link from "next/link";
import React from "react";

async function getData(id: string) {
  const res = await fetch(`https://free-time-server.onrender.com/api/v1/order/${id}`, {cache : "no-cache"});
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res.json();
}

const OrderDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return data.errorcode ? (
    <div className=" h-screen flex items-center justify-center">
      <div className="text-center  rounded-md p-4">
        <h1 className=" text-7xl font-bold text-red-500 mx-auto">404</h1>
        <h1 className=" text-2xl font-bold text-red-500">Page not found!</h1>
        <Link href="/">
          <button className="text-white bg-red-500 px-4 py-2 rounded-md mt-4 mx-auto active:opacity-80">
            back to home
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <PrivateRoute>
      <TopBanner page="order details" route="home/order/order details" />
      <div className=" max-w-screen-xl mx-auto p-4">
        <BillingAddress country={data.data.address.country} state={data.data.address.state} post={data.data.address.post} number={data.data.address.number} email={data.data.address.email} address_1_line={data.data.address.address_1_line} />
        <OrderProducts items={data.data.item} total={data.data.total} />
        {
          !data?.data?.paid && data?.data?.confirm && <PayOrder total={data.data.total} id={data.data._id} />
        }
        {
          !data?.data?.confirm &&   <VerifyOrder _id={data.data._id} country={data.data.address.country} state={data.data.address.state} post={data.data.address.post} number={data.data.address.number} email={data.data.address.email} address_1_line={data.data.address.address_1_line} item={data.data.item.length} total={data.data.total} />
        }
        {
          data.data.paid && <TrackOrder status={data.data.status} />
        }
      </div>
    </PrivateRoute>
  );
};

export default OrderDetails;
