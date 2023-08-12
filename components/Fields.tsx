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
      <div className="mx-auto max-w-[12rem] h-10 flex">
        <CustomInput
          defaultVal={days}
          direction={"l"}
          suffix={"Day(s)"}
          updateContext={updateDays}
        />
        <CustomInput
          defaultVal={hours}
          direction={"r"}
          suffix={"Hour(s)"}
          updateContext={updateHours}
        />
      </div>
    </div>
  );
};

export default Test;
