"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/lib/AppStateContext";
import CustomInput from "./common/CustomInput";
import { Toggle } from "@/components/ui/toggle";

import { Unlock, Lock } from "lucide-react";
import TooltipElement from "./common/TooltipElement";
import { FieldSkeleton } from "./common/FieldSekelton";
const Test = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDomLoaded(true);
    }, 1000);
  }, [isDomLoaded]);
  if (!isDomLoaded) return <FieldSkeleton />;
  const state = useAppContext();
  const { hours, days, lock, updateHours, updateDays, updateLock } = state;
  return (
    <div className="max-w-7xl mx-auto pt-10 pb-10 md:pb-6 px-2 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[16rem] h-12 flex items-center">
        <CustomInput
          disabled={lock}
          defaultVal={days}
          direction={"l"}
          suffix={"Day(s)"}
          updateContext={updateDays}
        />
        <CustomInput
          disabled={lock}
          defaultVal={hours}
          direction={"r"}
          suffix={"Hour(s)"}
          updateContext={updateHours}
        />
        <Toggle
          disabled={hours == 0 || days == 0}
          onClick={updateLock}
          className="ml-2 h-[2.6rem] w-12"
        >
          {!lock ? (
            <TooltipElement
              element={<Unlock className="h-8 w-4" />}
              tooltip={"Lock"}
              side={"right"}
            />
          ) : (
            <TooltipElement
              element={<Lock className="h-8 w-4" />}
              tooltip={"Unlock"}
              side={"right"}
            />
          )}
        </Toggle>
      </div>
    </div>
  );
};

export default Test;
