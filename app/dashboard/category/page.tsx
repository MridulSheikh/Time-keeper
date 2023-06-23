import React from "react";

const page = () => {
    const category = false;
  return (
    <div>
      {category ? (
        <div>order</div>
      ) : (
        <div className=" w-full flex justify-center items-center">
          <div className="py-5 text-center">
            <h1 className=" text-3xl font-bold text-cs-pink-800">
              You are didn&apos;t add any category
            </h1>
            <button className=" bg-cs-black py-1 px-5 rounded-md text-white mt-5 active:opacity-70">
              Please add some category
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
