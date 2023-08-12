"use client";
import React from "react";
import { useAppContext } from "@/lib/AppStateContext";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import CustomInput from "./common/CustomInput";

const Test = () => {
  const state = useAppContext();
  const {
    hours,
    days,
    faculties,
    courses,
    updateHours,
    updateDays,
    updateCourses,
    updateFaculties,
  } = state;
  return (
    <div className="max-w-7xl mx-auto pt-10 py-6 px-2 sm:px4 md:px-6">
      <div className="mx-auto max-w-[12rem] h-10 border border-zinc-300 dark:border-zinc-800 rounded-md flex">
        <div className="relative">
          <CustomInput defaultVal={days} />
          <p className="absolute top-3 right-4 text-xs text-zinc-500 ">
            Day(s)
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="relative">
          <CustomInput defaultVal={hours} />
          <p className="absolute top-3 right-4 text-xs text-zinc-500 ">
            Hour(s)
          </p>
        </div>
      </div>
      {/* <div className="flex flex-row gap-3 sm:gap-8 justify-center">
        <div className="max-w-[9rem] md:max-w-[8rem] sm:grid grid-cols-2 flex flex-col gap-2 sm:gap-6 sm:items-center">
          <p className="pl-1 ">Days</p>
          <Input type="number" defaultValue={days} className="" />
        </div>
        <div className="max-w-[9rem] md:max-w-[8rem] sm:grid grid-cols-2 flex flex-col gap-2 sm:gap-6 sm:items-center">
          <p className="pl-1 ">Hours</p>
          <Input type="number" defaultValue={hours} className="" />
        </div>
      </div> */}
    </div>
  );
};

export default Test;
