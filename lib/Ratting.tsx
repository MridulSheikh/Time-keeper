import React from "react";
import {BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

type props = {
  rating: {
    rate: number;
  };
};

// const rattingStar = Array.from({ length: 5 }, (v, index) => {
//     let number = index + 0.5;
//     return (
//       <div className="mr-1" key={index}>
//         {rating?.rate > index + 1
//           ?< BsStarFill className="text-yellow-500" />
//           : rating?.rate < number
//           ? <BsStarHalf className="text-yellow-500" />
//           : <BsStar className="text-yellow-500" />
//           }
//       </div>
//     );
//   });


const Ratting = ({ rating }: props) => {
  return (
    <div className="flex items-center gap-x-1">
        {
           Array.from({ length: 5 }, (v, index) => {
                let number = index + 0.5;
                return (
                  <span key={index}>
                    {rating?.rate >= index+1
                      ?< BsStarFill />
                      : rating?.rate >= number
                      ? <BsStarHalf />
                      : <BsStar />
                      }
                  </span>
                );
              })
        }
    </div>
  )
};

export default Ratting;