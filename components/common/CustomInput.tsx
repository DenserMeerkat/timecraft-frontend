import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

const CustomInput = (props: any) => {
  const defaultVal = props.defaultValue;
  const [inputValue, setInputValue] = useState(defaultVal);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (/^\d*$/.test(newValue)) {
      if (newValue.length <= 2) {
        setInputValue(newValue);
      }
    }
  };
  return (
    <Input
      type="number"
      value={inputValue}
      placeholder="0"
      onChange={handleInputChange}
      className="ml-2 m-0 pl-3 rounded-none border-0 focus-visible:ring-0 focus-visible:bg-zinc-100 focus-visible:dark:bg-zinc-900"
    />
  );
};

export default CustomInput;
