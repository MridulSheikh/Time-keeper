"use client";
import React, { useState } from "react";

const useSelectItem = () => {
  const [selectItem, setSelectItem] = useState<any>([]);

  const handleSingleItemSelect = (id: string) => {
    if (selectItem.length === 0) {
      const temp = [];
      temp.push(id);
      setSelectItem(temp);
      return;
    }
    if (selectItem.length > 0) {
      const filterItem = selectItem?.filter((item: string) => item === id);
      if (filterItem.length > 0) {
        const removeItemArray = selectItem?.filter(
          (item: string) => item != id
        );
        setSelectItem(removeItemArray);
        return;
      } else {
        const temarray = selectItem;
        temarray.push(id);
        setSelectItem((item: any) => [...item, id]);
        return;
      }
    }
  };

  const findItemFromArray = (id: string) => {
    const filterItem = selectItem?.filter((item: string) => item === id);
    if (filterItem.length > 0) {
      return true;
    }
    return false;
  };

  const handleAllselect = async (item: string[]) => {
    console.log(item)
    if (selectItem?.length === 0) {
      setSelectItem(item);
      return;
    }
    // if(selectItem?.length === item.length){
    //   setSelectItem([]);
    //   return;
    // }
    // const temp: string[] = []
    // const iterableItem = item?.map((it : string) => {
    //   const filterItem =  selectItem?.filter((item : string) => item === it)
    //   if(filterItem.length === 0){
    //     temp.push(it)
    //   }
    // })
    // setSelectItem((a : any) => [...a, temp] )
    setSelectItem([])
  };
  return {
    selectItem,
    findItemFromArray,
    handleSingleItemSelect,
    handleAllselect,
    setSelectItem
  };
};

export default useSelectItem;
