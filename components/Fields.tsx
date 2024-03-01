"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/components/context/AppStateContext";
import CustomInput from "./common/CustomInput";
import { Toggle } from "@/components/ui/toggle";

import { Unlock, Lock } from "lucide-react";
import TooltipElement from "./common/TooltipElement";
import { FieldSkeleton } from "./skeleton/FieldSekelton";
const Test = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const state = useAppContext();
  const { hours, days, lock, updateHours, updateDays, updateLock } = state;
  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);
  if (!isDomLoaded) return <FieldSkeleton />;
  return (
    <div className="mx-auto flex h-12 max-w-[16rem] items-center">
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
        disabled={hours == 0 || days == 0 || hours == null || days == null}
        onClick={updateLock}
        className="ml-2 h-[2.6rem] w-12"
        pressed={lock}
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
  );
};

export default Test;
