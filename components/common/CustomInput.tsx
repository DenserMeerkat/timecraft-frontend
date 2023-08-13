import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

const CustomInput = (props: any) => {
  const defaultVal = props.defaultValue;
  const direction: string = props.direction;
  const suffix: string = props.suffix;
  const updateContext = props.updateContext;
  const [inputValue, setInputValue] = useState(defaultVal);
  const commonClasses =
    "ml-2 m-0 pl-3 h-12 rounded-none border-0 focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:dark:bg-zinc-900 focus-visible:border-zinc-400 focus-visible:dark:border-zinc-500 text-lg font-semibold";
  const directionalClass = `border-2 border-zinc-200 dark:border-zinc-800 
  ${direction === "l" ? "rounded-l-lg w-[6.3rem]" : "rounded-r-lg w-[6.7rem]"}`;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (/^\d*$/.test(newValue)) {
      if (newValue.length <= 1) {
        setInputValue(newValue);
        updateContext(newValue);
      }
    }
  };
  return (
    <div className="relative">
      <Input
        type="number"
        value={inputValue}
        placeholder="0"
        autoFocus
        onChange={handleInputChange}
        className={`${commonClasses} ${directionalClass}`}
      />
      <p className="absolute top-3 right-4 text-md text-zinc-500 pointer-events-none">
        {suffix}
      </p>
    </div>
  );
};

export default CustomInput;
