'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const useFetchData = () => {
    const [brands, setBrands] = useState<any>();
    const [categories, setCategories] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
   
    useEffect(() => {
        getBrands();
        getCategory();
      }, []);

    const getBrands = () => {
        setLoading(true);
        axios
          .get("http://localhost:5000/api/v1/brand")
          .then((res) => {
            setBrands(res.data.data);
          })
          .catch((error) => {
            setBrands(null);
            console.log(error);
          })
          .finally(() => setLoading(false));
      };
      const getCategory = () => {
        setLoading(true);
        axios
          .get("http://localhost:5000/api/v1/category")
          .then((res) => {
            setCategories(res.data.data);
          })
          .catch((error) => {
            setCategories(null);
            console.log(error);
          })
          .finally(() => setLoading(false));
      };
  return {
        brands,
        categories,
        loading
  }
}
