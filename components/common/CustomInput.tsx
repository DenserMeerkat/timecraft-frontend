import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";

const CustomInput = (props: any) => {
  const defaultVal = props.defaultVal;
  const direction: string = props.direction;
  const suffix: string = props.suffix;
  const updateContext = props.updateContext;
  const disabled = props.disabled;
  const autofocus = props.autofocus;
  const [inputValue, setInputValue] = useState(defaultVal);
  const commonClasses = `ml-2 m-0 pl-3 h-12 rounded-none border-0 focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:dark:bg-zinc-900/[0.6] focus-visible:border-zinc-400 focus-visible:dark:border-zinc-500 ${
    disabled
      ? "bg-zinc-100 dark:bg-zinc-950/40"
      : "bg-white dark:bg-zinc-950/[0.9]"
  } text-lg font-semibold`;
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

  useEffect(() => {
    setInputValue(defaultVal);
  }, [defaultVal]);

  return (
    <div className="relative">
      <Input
        disabled={disabled}
        type="number"
        value={inputValue == null || inputValue === 0 ? "" : inputValue}
        placeholder="0"
        autoFocus={autofocus}
        onChange={handleInputChange}
        className={`${commonClasses} ${directionalClass}`}
      />
      <p className="text-md pointer-events-none absolute right-4 top-3 text-zinc-500">
        {suffix}
      </p>
    </div>
  );
};

export default CustomInput;
