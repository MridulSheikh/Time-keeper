"use client";
import { TopBanner, GoogleLogin } from "@/components";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import { RiErrorWarningLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";

type inputType = {
  email: string;
  password: string;
  c_password: string;
};

const Signup = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { Signup_password, error, user, authLoading } = useAuth();

  // validation check
  const formSchema = Yup.object().shape({
    email: Yup.string().required("email is medatory"),
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
    c_password: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  // react hooks form
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<inputType>(formOptions);
  const onSubmit: SubmitHandler<inputType> = (data) => {
    const { email, password } = data;
    Signup_password(email.toLowerCase(), null, password);
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const rederect_uri = searchParams.get("from") || "/";
  if (user?.email) {
    return router.replace(rederect_uri);
  }
  return authLoading ? (
    <div>
      <TopBanner page={"Login"} route={"home / login"} />
      <div className="w h-96 flex justify-center items-center gap-x-2">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
        <p>Creating user</p>
      </div>
    </div>
  ) : (
    <div>
      <TopBanner page={"Sign up"} route={"home / signup"} />
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
                required: "please enter a valid password",
              })}
              type={showPass ? "text" : "password"}
              placeholder="********"
              className={`px-4 py-1 ${
                errors.password ? "outline-red-700" : "outline-cs-gray/50"
              }  outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800`}
            />
          </div>
          <div className="mt-5">
            <p>
              C-password<sup className="text-red-700">*</sup>
            </p>
            {errors.c_password && (
              <p className="mt-4 text-red-600">{errors.c_password.message}</p>
            )}
            <input
              {...register("c_password", {
                required: "please enter confirm password",
              })}
              type={showPass ? "text" : "password"}
              placeholder="********"
              className={`px-4 py-1 ${
                errors.c_password ? "outline-red-700" : "outline-cs-gray/50"
              }  outline-none mt-2 rounded-md w-full focus:outline-cs-pink-800`}
            />
          </div>
          <div className="flex items-center gap-x-2 mt-3">
            <input
              type="checkbox"
              checked={showPass}
              onClick={() => setShowPass(!showPass)}
            />
            <p>Show Password?</p>
          </div>
          <div className="mt-5">
            Have a account?{" "}
            <Link href={"/login"} className="underline">
              login
            </Link>
          </div>
          {error && (
            <div className="mt-4 text-red-600 flex gap-x-1 items-center text-md">
              <RiErrorWarningLine className="mt-1" /> <p>{error}</p>
            </div>
          )}
          <input
            type="submit"
            className="w-full py-2 rounded-md bg-cs-black text-white cursor-pointer mt-3"
            value={"Create an account"}
          />
        </form>
        <p className="text-center my-5">-- or --</p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Signup;
