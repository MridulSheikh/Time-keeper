"use client";
import { format } from "date-fns";
import React, { use, useState } from "react";
import {
  CaptionProps,
  DayPicker,
  addToRange,
  useNavigation,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const css = `
.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
  background-color: #f0f8ff !important;
  color: #4a90e2;
}
.Selectable .DayPicker-Day {
  border-radius: 0 !important;
}
.Selectable .DayPicker-Day--start {
  border-top-left-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
}
.Selectable .DayPicker-Day--end {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}

`;

const CustoCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex justify-between items-center mb-5">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className=" hover:bg-cs-pink-800/10 p-3 cursor-pointer rounded-full ease-in duration-300"
      >
        <AiOutlineLeft />
      </button>
      <h2>{format(props.displayMonth, 'MMM yyy')}</h2>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className=" hover:bg-cs-pink-800/10 p-3 cursor-pointer rounded-full ease-in duration-300"
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export function DatePicker() {
  const [range, setRange] = useState<any>();

  const handleDayClicked = (day: any) => {
    const rangs = addToRange(day, range);
    setRange(rangs);
  };
  return (
    <div className="bg-cs-pink-200 py-5 mt-10">
      <style>{css}</style>
      <h1 className="text-center text-2xl font-semibold">CALENDER</h1>
      <DayPicker
        mode="range"
        selected={{ from: range?.from, to: range?.to }}
        onDayClick={handleDayClicked}
        modifiers={{ start: range?.from, end: range?.to }}
        fromYear={2023}
        fromMonth={new Date(2023, 4)}
        modifiersClassNames={{
          selected: "Selectable",
        }}
        components={{
          Caption : CustoCaption
        }}
      />
    </div>
  );
}
