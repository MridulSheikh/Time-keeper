'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { DECREMENT, INCREMENT } from './useCounter';

interface cartType {
    _id : string;
    name : string;
    price : number;
    quantity : number;
    img: string;
}

const useCart = () => {
    const [cart, setCart] = useState<cartType[]>()
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

    const handleRremovedItemFromCart = (value : string) => {
          const filtercart = cart?.filter((item : any) => item._id !== value)
          localStorage.setItem("cart", JSON.stringify(filtercart));
          setCart(filtercart)
          toast.success(`Successfully removed item from cart.`)
    }
    const handleQuantityIncrementDecrement = (id:string, type:string) => {
          switch (type) {
            case INCREMENT:
                const updatedCart  = cart?.map((item : any) => {
                    if(item._id !== id){
                        return item
                    }
                    return {
                        ...item,
                        quantity : item.quantity + 1,
                    }
                })
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  setCart(updatedCart)
                break;
          
            case DECREMENT:
                const updatedDecrementCart  = cart?.map((item : any) => {
                    if(item._id !== id){
                        return item
                    }
                    return {
                        ...item,
                        quantity : item.quantity <= 1 ? 1 : item.quantity - 1,
                    }
                })
                  localStorage.setItem("cart", JSON.stringify(updatedDecrementCart));
                  setCart(updatedDecrementCart)
                break;
          }
    }
  return {
       handleAddToCart,
       cart,
       setCart,
       handleRremovedItemFromCart,
       handleQuantityIncrementDecrement
  }
}

export default useCart