"use client";
import {
  PrivateRoute,
  ProductBanner,
  RelatedProduct,
  Revews,
  RevewsForm,
  TopBanner,
} from "@/components";
import useAuth from "@/hooks/useAuth";
import React from "react";

const ProductDetails = async ({ params }: {params : {id : string}}) => {
  const {token} = useAuth()
  const { id } = params;
  const uri = `http://localhost:5000/api/v1/product/${id}`;
  const res = await fetch(uri, {
    next: { revalidate: 60 }, 
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer" + " " + token,
    },
  });
  const product = await res.json();
  return (
    <PrivateRoute>
      <TopBanner
        page={product?.data?.name}
        route={`home / shop / ${product?.data?.name}`}
      />
      <div className="max-w-screen-2xl mx-auto px-4">
        <ProductBanner
          name={product?.data?.name}
          _id={product?.data?._id}
          img={product?.data?.img}
          price={product?.data?.price}
          reviews={product?.data?.reviews}
          brand={product?.data?.brand?.name}
          category={product?.data?.category?.name}
          discription={product?.data?.description}
        />
        <RelatedProduct brand={product?.data?.brand} />
        <div className="grid lg:grid-cols-2 mt-32 gap-10 mb-10">
          <Revews reviews={product?.data?.reviews} />
          <RevewsForm name={product?.data?.name} id={product?.data?._id} />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProductDetails;
