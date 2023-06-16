"use client";
import React from "react";

export const RevewsForm = () => {
  return (
    <div>
      <h1 className=" text-3xl font-oswoald text-cs-gray">
        Be the first to review “Fastrack Analog Golden Dial Men’s Watch”
      </h1>
      <form action="">
        <p className=" text-md font-oswoald font-extralight mt-5">
          Your Name or E-mail will not be published. Required fields are marked
          *
        </p>
        <div className="mt-5">
          <p className=" text-md font-oswoald font-extralight">Your Ratting*</p>
          <select
            name="rating"
            className="mt-1 w-full border px-3 py-2 border-cs-pink-800 rounded-md outline-none text-cs-pink-800"
          >
            <option value={0}>0</option>
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
            <option value={4.5}>4.5</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="mt-5">
          <p className=" text-md font-oswoald font-extralight">Your Review*</p>
          <textarea className="w-full mt-1 bg-cs-gray/80 rounded-md outline-none p-4" rows={10} />
        </div>
        <input type="submit" className="w-full py-2 bg-cs-black text-white rounded-md cursor-pointer mt-5" />
      </form>
    </div>
  );
};
