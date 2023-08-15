'use client'
import React, { useState } from 'react'

export const INCREMENT = 'cart/increment'
export const DECREMENT = 'cart/decrement'

const useCounter = () => {
  const [count, setCount] = useState(1);
  
  const countHandler = (type : string) => {
        switch (type) {
            case INCREMENT :
                 setCount(prev => prev+1)
                break;
            case DECREMENT:
                if(count <= 1) return
                setCount(prev => prev-1)
                break;
        }
  }

  return {
    count,
    countHandler
  }
}

export default useCounter