import Ratting from "@/lib/Ratting";
import Image from "next/image";
import React from "react";

// const reviews = [
//   {
//     id: 1,
//     ratting: 5,
//     review: "This product is awesome",
//   },
//   {
//     id: 2,
//     ratting: 3.5,
//     review:
//       "প্রথমে অনেক অনেক ধন্যবাদ জানাতে চাই ShopZ BD.com কে কারণ আমার আব্বু আম্মুর বিশ্বাস রাখবার জন্য। অনলাইন থেকে কিছু কিন্তে গেলে সব সময় বাজে মন্তব্য করতো।",
//   },
//   {
//     id: 3,
//     ratting: 4.5,
//     review:
//       "I am happy to find my order is very quick. Thank u for this service",
//   },
//   {
//     id: 4,
//     ratting: 2.5,
//     review: "I'm Satisfied with this Watch",
//   },
// ];

const RevewCard = ({ ratting, reveiw }: any) => {
  return (
    <div className="flex gap-x-3 mt-7">
      <div>
        <div className=" relative w-16 h-16">
          <Image
            alt={"place holder"}
            fill
            src="/images/istockphoto-1202490454-612x612.png"
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <Ratting rating={{ rate: ratting }} className="text-cs-pink-800" />
        <div className="mt-2">{reveiw}</div>
      </div>
    </div>
  );
};

export const Revews = ({
  reviews,
}: {
  reviews: [{ email: string; ratting: number; review: string }];
}) => {
  return (
    <div className="font">
      <h1 className="text-2xl">Reviews ({reviews.length})</h1>
      <div className="mt-10">
        {reviews?.map((rv, index) => (
          <RevewCard key={index} ratting={rv.ratting} reveiw={rv.review} />
        ))}
      </div>
    </div>
  );
};
