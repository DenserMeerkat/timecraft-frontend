"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppContext } from "@/lib/AppStateContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
    <div className="max-w-7xl mx-auto py-10 px-2 sm:px4 md:px-6">
      <div className="flex flex-row sm:flex-col gap-3 sm:gap-8">
        <div className="max-w-[9rem] md:max-w-[8rem] sm:grid grid-cols-2 flex flex-col gap-4 sm:gap-6 sm:items-center">
          <p className="pl-1 ">Days</p>
          <Input type="number" defaultValue={days} className="" />
        </div>
        <div className="max-w-[9rem] md:max-w-[8rem] sm:grid grid-cols-2 flex flex-col gap-4 sm:gap-6 sm:items-center">
          <p className="pl-1 ">Hours</p>
          <Input type="number" defaultValue={hours} className="" />
        </div>
      </div>
    </div>
  );
};

export default Test;
