import Image from "next/image";
import Link from "next/link";
import React from "react";

type productType = {
  _id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
};

interface PropsType {
  items: productType[];
  total : number;
}

const OrderProductRow = ({ _id, img, name, price, quantity }: productType) => {
  return <div className="grid grid-cols-4 p-3 border-b border-x gap-x-5">
    <div className=" flex justify-start md:items-center gap-x-4 col-span-2">
        <div className=" relative w-10 h-10">
        <Image src={img} alt="product image" fill className="object-contain" />
        </div>
        <Link href={`/shop/${_id}`}>
          <button className=" text-sm md:text-md hover:underline hover:text-cs-pink-800">{name}</button>
        </Link>
    </div>
    <p>{price}</p>
    <p>{quantity}</p>
  </div>;
};

export const OrderProducts = ({ items, total }: PropsType) => {
  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold text-cs-black mb-3">Order Products</h1>
      <div className="grid grid-cols-4 p-3 bg-cs-pink-800 text-white gap-x-5">
        <h1 className="col-span-2">Name</h1>
        <h1>Price</h1>
        <h1>Quantity</h1>
      </div>
      <div>
        {
            items?.map(item => <OrderProductRow _id={item._id} key={item._id} img={item.img} name={item.name} price={item.price} quantity={item.quantity} />)
        }
      </div>
      <div className="grid grid-cols-4 p-3 bg-cs-pink-800/60 text-white gap-x-5">
        <h1 className="col-span-2">Total</h1>
        <h1></h1>
        <h1>${total}</h1>
      </div>
    </div>
  );
};
