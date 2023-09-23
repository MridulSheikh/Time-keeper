"use client";
import { SetImageContainer } from "@/components/Brands/AddBrand";
import React, { useMemo, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import useAuth from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CreateBlog = () => {
  const {user,token} = useAuth();
  const toastId = useRef<any>(null);
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const handlePostBlog = () => {
    if(!title || !imageUrl || !content){
        toast.error("Plase provide all information")
        return;
    }
    toastId.current = toast.loading("please wait...");
    const body = {
        title : title,
        cover : imageUrl,
        body : content,
        author : user.email,
    }
    axios
    .post("https://free-time-server.onrender.com/api/v1/blog", body,{
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
  })
}
  return (
    <div>
        <ToastContainer />
      <div className=" flex justify-between px-5 py-2 items-center border-b bg-white sticky top-0">
        <h1 className="text-xl font-bold text-cs-black">Create Blog</h1>
        <button onClick={handlePostBlog} className="border  px-3 py-2 rounded-md text-cs-black active:bg-cs-nural ease-in duration-200">
          Publish
        </button>
      </div>
      <div className="m-5">
        <div className="h-96">
          <SetImageContainer setImageUrl={setImageUrl} imageUrl={imageUrl} />
        </div>
        <div className="mt-5">
          <p>Ttitle*</p>
          <input
            onChange={e => setTitle(e.target.value)}
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
    </div>
  );
};

export default CreateBlog;
