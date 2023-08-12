import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

const CustomInput = (props: any) => {
  const defaultVal = props.defaultValue;
  const direction: string = props.direction;
  const suffix: string = props.suffix;
  const updateContext = props.updateContext;
  const [inputValue, setInputValue] = useState(defaultVal);
  const commonClasses =
    "ml-2 m-0 pl-4 rounded-none border-0 focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:dark:bg-zinc-900 focus-visible:border-zinc-400 focus-visible:dark:border-zinc-500 ";
  const directionalClass = `border border-zinc-300 dark:border-zinc-800 
  ${direction === "l" ? "rounded-l-lg w-[5.7rem]" : "rounded-r-lg w-[6.1rem]"}`;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (/^\d*$/.test(newValue)) {
      if (newValue.length <= 2) {
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
        onChange={handleInputChange}
        className={`${commonClasses} ${directionalClass}`}
      />
      <p className="absolute top-3 right-4 text-xs text-zinc-500 pointer-events-none">
        {suffix}
      </p>
    </div>
  );
};

export default CustomInput;
