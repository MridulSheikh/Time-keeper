"use client";
import { GoogleLogin, LoadingModal, TopBanner } from "@/components";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {RiErrorWarningLine} from "react-icons/ri"

type inputType = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { authLoading, loginpassword, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputType>();
  const onSubmit: SubmitHandler<inputType> = (data) => {
    loginpassword(data.email, data.password)
  };
  return (
    <div>
      <TopBanner page={"Login"} route={"home / login"} />
      <div className="max-w-screen-sm mx-auto px-4 my-14">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>
              E-mail<sup className="text-red-700">*</sup>
            </p>
            {errors.email && (
              <p className="mt-4 text-red-600">{errors.email.message}</p>
            )}
            <input
              {...register("email", {
                required: "please enter email address",
              })}
              type="email"
              placeholder="address@gmail.com"
              className={`px-4 py-1 ${
                errors.email ? "outline-red-700" : "outline-cs-gray/50"
              }  outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800`}
            />
          </div>
          <div className="mt-5">
            <p>
              Password<sup className="text-red-700">*</sup>
            </p>
            {errors.password && (
              <p className="mt-4 text-red-600">{errors.password.message}</p>
            )}
            <input
             {...register("password", {
                required: "please enter the password",
              })}
              type={showPass ? "text" : "password"}
              placeholder="********"
              className={`px-4 py-1 ${
                errors.password ? "outline-red-700" : "outline-cs-gray/50"
              }  outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800`}
            />
          </div>
          <div className="flex items-center gap-x-2 mt-3">
            <input type="checkbox" checked={showPass}
              onClick={() => setShowPass(!showPass)} />
            <p>Show Password?</p>
          </div>
          <div className="mt-5">
            New here?{" "}
            <Link href={"/signup"} className="underline">
              create account
            </Link>
          </div>
          {error && <div className="mt-4 text-red-600 flex gap-x-1 items-center text-md"><RiErrorWarningLine className="mt-1" /> <p>{error}</p></div>}
          <input
            type="submit"
            className="w-full py-2 rounded-md bg-cs-black text-white cursor-pointer mt-3"
            value={"login"}
          />
        </form>
        <p className="text-center my-5">-- or --</p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
