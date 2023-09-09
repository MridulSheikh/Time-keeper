"use client";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import {FaUserCircle} from "react-icons/fa"

const Page = () => {
  const { token } = useAuth();
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
      .get("http://localhost:5000/api/v1/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + token,
        },
      })
      .then((res) => setUsers(res.data.body))
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const addAdminHandler = () => {
    if (!email) {
      toast.warn("email not found!");
      return;
    }
    toastId.current = toast.loading("please wait...");
    axios
      .patch(
        `http://localhost:5000/api/v1/user/${email}`,
        { role: "admin" },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        }
      )
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

  const removedAdmin = (email: any) => {
    toastId.current = toast.loading("please wait...");
    axios
      .patch(
        `http://localhost:5000/api/v1/user/${email}`,
        { role: "buyer" },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + " " + token,
          },
        }
      )
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
  };
  return (
    <div className="w-full pb-20">
      <ToastContainer />
      <div className="flex justify-between items-center px-5 py-3 bg-white border-b">
        <div className="flex items-center gap-x-3">
          <RiAdminFill className="text-xl" />
          <h1 className="text-xl text-cs-black font-bold">Admin</h1>
        </div>
        <div className="flex items-center">
          <input
            className="px-4 py-2 rounded-md border rounded-r-none bg-cs-nural"
            placeholder="Add admin by email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
          <button
            onClick={addAdminHandler}
            className=" border  bg-cs-black text-white px-4 py-2 rounded-md rounded-l-none active:opacity-80"
          >
            Add
          </button>
        </div>
        <button
          onClick={getAdminData}
          className="bg-blue-800 text-white py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
        >
          <GrRefresh className="text-white text-xl" />
          <p>Refresh</p>
        </button>
      </div>
      {IsLoading ? (
        <div className="mx-auto w-8/12 mt-5 h-96 flex justify-center items-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : (
        <div className=" grid grid-cols-4 mt-5 px-4 gap-5">
          {users
            ?.filter((user: any) => user.role === "admin")
            .map((user: any) => (
              <div
                key={user?._id}
                className="flex flex-col p-4 bg-white gap-y-3 items-center border rounded-md"
              >
                <h1 className="text-4xl text-gray-500" ><FaUserCircle /></h1>
                <h1>{user.email}</h1>
                <button
                  onClick={() => removedAdmin(user.email)}
                  className="bg-red-500 px-4 py-2 rounded-md active:opacity-80 text-white"
                >
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
