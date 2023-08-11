"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [users, setUsers] = useState<any>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const toastId = useRef<any>(null);
  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/v1/user")
      .then((res) => setUsers(res.data.body))
      .catch((error) => setUsers([]))
      .finally(() => setIsLoading(false));
  };

  const addAdminHandler = () => {
    toastId.current = toast.loading("please wait...");
    axios
      .patch(`http://localhost:5000/api/v1/user/${email}`, { role: "admin" })
      .then((res) => {
        toast.update(toastId.current, {
          render: "successfully add admin please refresh page",
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };

  const removedAdmin = (email : any) => {
    toastId.current = toast.loading("please wait...");
    axios
      .patch(`http://localhost:5000/api/v1/user/${email}`, { role: "buyer" })
      .then((res) => {
        toast.update(toastId.current, {
          render: "successfully remove admin please refresh page",
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  }
  return (
    <div className="w-full pb-20">
      <ToastContainer />
      <div className="flex justify-between items-center px-5 py-3">
        <div className="flex items-center gap-x-3">
          <RiAdminFill className="text-xl" />
          <h1 className="text-xl text-cs-black font-bold">Admin</h1>
        </div>
        <div className="flex items-center gap-x-5">
          <input
            className="px-4 py-2 rounded-md border shadow-md bg-white"
            placeholder="Add admin by email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
          <button
            onClick={addAdminHandler}
            className=" bg-cs-black text-white px-4 py-2 rounded-md active:opacity-80"
          >
            Add
          </button>
        </div>
      </div>
      <div className="bg-white border px-5 py-3 rounded-md shadow-md mx-auto w-8/12 grid grid-cols-3 mt-10 font-bold text-cs-black">
        <h1 className="col-span-2">Email</h1>
        <div className="flex justify-end">
          <button
            onClick={getAdminData}
            className="bg-cs-black text-white px-4 py-2 rounded-md active:opacity-80"
          >
            Refresh
          </button>
        </div>
      </div>
      {IsLoading ? (
        <div className="bg-white border rounded-md shadow-md mx-auto w-8/12 mt-5 h-96 flex justify-center items-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : (
        <div className="bg-white border rounded-md shadow-md mx-auto w-8/12 mt-5">
          {users
            ?.filter((user: any) => user.role === "admin")
            .map((user: any) => (
              <div key={user?._id} className="flex justify-between p-4 border-b items-center">
                <h1>{user.email}</h1>
                <button onClick={() => removedAdmin(user.email)} className="bg-red-500 px-4 py-2 rounded-md active:opacity-80">
                  Remove
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Page;
