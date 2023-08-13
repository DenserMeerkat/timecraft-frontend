import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle-colored";

const HourGrid: React.FC<{
  rows: number;
  columns: number;
  bg: "rose" | "zinc" | "sky" | undefined;
  list: number[];
}> = ({ rows, columns, bg, list }) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const indexList: number[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      indexList.push(index);
    }
  }
  const updateList = (index: number) => {
    if (list.includes(index)) {
      const indexToRemove = list.indexOf(index);
      list = list.filter((num) => num !== indexToRemove);
    } else {
      list.push(index);
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
        isFocussed ? "darkborder-zinc-300" : "dark:border-zinc-800"
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
