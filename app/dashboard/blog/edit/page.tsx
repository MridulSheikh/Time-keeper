"use client";
import { ConfirmModal } from "@/components";
import { SetImageContainer } from "@/components/Brands/AddBrand";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const EditBlog = () => {
  const searchParams = useSearchParams()
  const query_title = searchParams.get('title')
  const router = useRouter();
  const { user, token } = useAuth();
  const [blog, setblog] = useState<any>();
  const toastId = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/blog/getbytitle/${query_title}`
      )
      .then((res) => {
        setTitle(res.data.data.title);
        setImageUrl(res.data.data.cover);
        setContent(res.data.data.body);
        setblog(res.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  // load data when page rendaring
  useEffect(() => {
    getData();
  }, [query_title]);
  const handleUpdateBlog = () => {
    if (!title || !imageUrl || !content) {
      toast.error("Plase provide all information");
      return;
    }
    toastId.current = toast.loading("please wait...");
    const body = {
      title: title,
      cover: imageUrl,
      body: content,
      author: user.email,
    };
    axios
      .patch(`http://localhost:5000/api/v1/blog/${blog._id}`, body, {
        headers: {
          "Content-Type": "application/json",
          " Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        toast.update(toastId.current, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.errormessage,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };

  // delete blog
  const handledeleteBlog = () => {
    toastId.current = toast.loading("please wait...");
    axios
      .delete(`http://localhost:5000/api/v1/blog/${blog._id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        toast.update(toastId.current, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
        router.replace("/dashboard/blog");
      })
      .catch((error) => {
        toast.update(toastId.current, {
          render: error.response.data.errormessage,
          type: "error",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 6000,
        });
      });
  };
  return blog ? (
    <div>
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        condition={"confirm"}
        action={handledeleteBlog}
        message={`Are you sure want to delete this Blog. Please type 'confirm' `}
        loading={isLoading}
      />
      <ToastContainer />
      <div className=" flex justify-between px-5 py-2 items-center border-b bg-white z-30">
        <h1 className="text-xl font-bold text-cs-black">Create Blog</h1>
        <div className="flex gap-x-4 items-center">
          <button
            onClick={getData}
            className="border  px-3 py-2 rounded-md text-white bg-cs-black active:bg-cs-nural ease-in duration-200"
          >
            Refresh
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="border  px-3 py-2 rounded-md text-white bg-red-700 active:bg-cs-nural ease-in duration-200"
          >
            Delete
          </button>
          <button
            onClick={handleUpdateBlog}
            className="border  px-3 py-2 rounded-md text-cs-black active:bg-cs-nural ease-in duration-200"
          >
            Publish
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : (
        <div className="m-5">
          <div className="h-96">
            <SetImageContainer setImageUrl={setImageUrl} imageUrl={imageUrl} />
          </div>
          <div className="mt-5">
            <p>Ttitle*</p>
            <input
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border px-2 py-2 rounded-md bg-transparent w-full mt-2"
              placeholder="Input your blog title"
            />
          </div>
          <div className="mt-5">
            <p className="mb-2">Content*</p>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center  rounded-md p-4">
        <h1 className=" text-7xl font-bold text-red-500 mx-auto">4O4</h1>
        <h1 className=" text-2xl font-bold text-red-500">Page not found!</h1>
      </div>
    </div>
  );
};

export default EditBlog;
