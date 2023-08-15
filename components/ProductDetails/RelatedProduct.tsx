"use client";
import { Brand_data_types, product_data_types } from "@/typedeclaration/types";
import React, { use, useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import axios from "axios";
import { DahsboardPagination } from "../DashboardPagination";
// import { Pagination } from '../DashboardPagination'

export const RelatedProduct = ({ brand }: { brand: Brand_data_types }) => {
  const [products, setProduct] = useState<any>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/product?brand=${brand._id}&limit=4&page=${page}`
      )
      .then((res) => setProduct(res.data.data))
      .catch((error) => setProduct([]));
  }, [page]);
  return (
    <div className="mt-20">
      <h1 className="text-center font-oswoald text-4xl font-normal">
        Related Products
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
        {products?.products?.map((dt: any) => (
          <ProductCard
            key={dt._id}
            _id={dt._id}
            name={dt.name}
            img={dt.img}
            price={dt.price}
            reviews={dt.reviews}
          />
        ))}
      </div>
      <DahsboardPagination
        page={page}
        setPage={setPage}
        pageCount={products?.pagecount}
      />
    </div>
  );
};
