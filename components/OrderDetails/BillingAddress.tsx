import React from 'react'

interface propsType{
    country : string;
    state : string;
    post : string;
    number : string;
    email : string;
    address_1_line : string;
}

export const BillingAddress = ({country, state, post, number, email, address_1_line} : propsType) => {
  return (
    <div className="border">
    <h1 className=" text-md bg-cs-pink-800 font-semibold text-white p-2">
      Billing Address
    </h1>
    <div className="m-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-4">
      <div>
        <h1 className=" text-xl font-bold">Country</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {country}
        </p>
      </div>
      <div>
        <h1 className=" text-xl font-bold">State</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {state}
        </p>
      </div>
      <div>
        <h1 className=" text-xl font-bold">Post</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {post}
        </p>
      </div>
      <div>
        <h1 className=" text-xl font-bold">Number</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {number}
        </p>
      </div>

      <div>
        <h1 className=" text-xl font-bold">Email</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {email}
        </p>
      </div>
      <div>
        <h1 className=" text-xl font-bold">Address 1 line</h1>
        <p className="mt-2 font-semibold text-gray-600">
          {address_1_line}
        </p>
      </div>
    </div>
  </div>
  )
}