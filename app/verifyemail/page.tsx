"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Verify = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [error, setError] = useState<null | string>(null);
  const [loading, setIsLoading] = useState<true | false>(false);

  const handlerequest = () => {
    if (!token || !email) {
      router.replace("/");
    }
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/user/confirm/${email}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        if (res.data.status === "succeess") {
          router.replace("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-96 flex justify-center items-center bg-cs-nural">
      {error ? (
        <div className="text-center bg-white shadow-md rounded-md p-4">
          <h1 className=" text-2xl font-bold text-red-700">{error}</h1>
          <button
            className="text-white bg-cs-pink-800 px-4 py-2 rounded-md mt-4 mx-auto"
            onClick={() => router.replace("/")}
          >
            home
          </button>
        </div>
      ) : (
        <div className="text-center bg-white shadow-md rounded-md p-4">
          {loading ? (
            <h1 className=" text-2xl font-bold text-cs-black">verifying....</h1>
          ) : (
            <div>
              <h1 className=" text-2xl font-bold text-cs-black">
                Press to button verify your email
              </h1>
              <button
                className="text-white bg-cs-pink-800 px-4 py-2 rounded-md mt-4 mx-auto"
                onClick={handlerequest}
              >
                verify
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
