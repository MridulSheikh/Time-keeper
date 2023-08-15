'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface cartType {
    _id : string;
    name : string;
    price : number;
    quantity : number;
    img: string;
}

const useCart = () => {
    const [cart, setCart] = useState<cartType[]>()
    console.log(cart)
    const handleAddToCart = (item : any) =>{
        const cart = localStorage.getItem("cart");
        const products = cart ? JSON.parse(cart) : [];
        const filterProduct = products.filter((product : any) => product._id === item._id)
        if(filterProduct.length > 0){
            updateQuantity(item)
        }else{
            const itemArray = [...products, item]
            localStorage.setItem("cart", JSON.stringify(itemArray));
            setCart(itemArray)
            toast.success(`${item.name} added to cart.`)
        }
    }

    const updateQuantity = (item : any) =>{
        const cart = localStorage.getItem("cart");
        const products = cart ? JSON.parse(cart) : [];
        const updatePerData = products.map((product : any) => {
              if(product._id !== item._id){
                return product
              }
              return{
                ...product,
                quantity : product.quantity + item.quantity
              }
        })
        localStorage.setItem("cart", JSON.stringify(updatePerData));
        setCart(updatePerData)
        toast.success(`${item.name} added to cart.`)
    }

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        const products = cart ? JSON.parse(cart) : [];
        setCart(products);
    },[])

  return {
       handleAddToCart,
       cart,
       setCart
  }
}

export default useCart