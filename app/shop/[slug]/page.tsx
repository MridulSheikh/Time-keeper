"use client";
import {
  PrivateRoute,
  ProductBanner,
  RelatedProduct,
  Revews,
  RevewsForm,
  TopBanner,
} from "@/components";
import React from "react";

const page = async ({ params }: any) => {
  const { slug } = params;
  const uri = `http://localhost:5000/api/v1/product/${slug}`;
  const res = await fetch(uri, { next: { revalidate: 60 } });
  const product = await res.json();
  return (
    <PrivateRoute>
      <TopBanner
        page={product.data.name}
        route={`home / shop / ${product.data.name}`}
      />
      <div className="max-w-screen-2xl mx-auto px-4">
        <ProductBanner
          img={product.data.img}
          price={product.data.price}
          reviews={product.data.reviews}
          brand={product.data.brand.name}
          category={product.data.category.name}
          discription={product.data.description}
        />
        <RelatedProduct brand={product.data.brand} />
        <div className="grid lg:grid-cols-2 mt-32 gap-10 mb-10">
          <Revews reviews={product.data.reviews} />
          <RevewsForm name={product.data.name} id={product.data._id} />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
