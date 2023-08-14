import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle-colored";

const HourGrid: React.FC<{
  rows: number;
  columns: number;
  bg: "rose" | "zinc" | "sky" | undefined;
  value?: number[];
  onChange: (newValue: number[]) => void;
}> = ({ rows, columns, bg, value, onChange }) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const indexList: number[] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      indexList.push(index);
    }
  }

  const updateList = (index: number) => {
    if (value && value.includes(index)) {
      const updatedValue = value.filter((num) => num !== index);
      onChange(updatedValue);
    } else {
      const updatedValue = [...(value || []), index];
      onChange(updatedValue);
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: "0.5rem",
    padding: "0.5rem",
  };

  return (
    <div
      style={gridStyle}
      className={`rounded-md border ${
        isFocussed
          ? "darkborder-zinc-300 border-black"
          : "dark:border-zinc-800 border-zinc-200"
      }`}
      onMouseEnter={() => setIsFocussed(true)}
      onMouseLeave={() => setIsFocussed(false)}
    >
      {indexList.map((index) => (
        <Toggle
          key={index}
          size={"sm"}
          variant={"outline"}
          color={bg}
          className={`text-xs`}
          onClick={() => updateList(index)}
        >
          {index}
        </Toggle>
      ))}
    </div>
  );
};

export default HourGrid;
