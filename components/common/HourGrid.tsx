import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle-colored";
import { Schedule } from "@/lib/types";

const HourGrid: React.FC<{
  rows: number;
  columns: number;
  bg: "rose" | "zinc" | "sky" | "emerald" | "blue" | undefined;
  value?: number[];
  onChange: (newValue: number[]) => void;
  disabled?: boolean;
  unselectable?: number[];
  maxSelection?: number;
}> = ({
  rows,
  columns,
  bg,
  value,
  onChange,
  disabled,
  unselectable,
  maxSelection,
}) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const indexList: number[] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      indexList.push(index);
    }
  }

  const week: Schedule[] = [];
  for (let i = 0; i < rows; i++) {
    const day: Schedule = {
      id: String.fromCharCode(65 + i),
      periods: [],
    };
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      day.periods.push(index);
    }
    week.push(day);
  }

  const updateList = (index: number) => {
    if (value && value.includes(index)) {
      const updatedValue = value.filter((num) => num !== index);
      updatedValue.sort((a, b) => a - b);
      onChange(updatedValue);
    } else {
      const updatedValue = [...(value || []), index];
      updatedValue.sort((a, b) => a - b);
      onChange(updatedValue);
    }
  };

  const _columns: number = Number(columns) + 1;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `minmax(0, 0.5fr) repeat(${
      _columns - 1
    }, minmax(0, 1fr))`,
    gap: "0.5rem",
    padding: "0.5rem",
    placeItems: "center",
  };
  return (
    <div
      className={`rounded-md border p-2 
      ${
        isFocussed
          ? "border-black dark:border-zinc-300"
          : "border-zinc-200 dark:border-zinc-800"
      }
      ${
        disabled ?? false
          ? "pointer-events-none cursor-not-allowed opacity-50"
          : ""
      }
      `}
      style={gridStyle}
      onFocus={() => setIsFocussed(true)}
      onBlur={() => setIsFocussed(false)}
    >
      <>
        <div className="col-span-1"></div>
        {Array.from({ length: columns }, (_, i) => (
          <div key={i} className="col-span-1">
            <p className="text-center">{i + 1}</p>
          </div>
        ))}
      </>
      {week.map((day: Schedule) => (
        <React.Fragment key={day.id}>
          <p className="col-span-1 text-center">{day.id}</p>
          <>
            {day.periods.map((period: number, index: number) => {
              if (unselectable && unselectable.includes(period)) {
                return (
                  <Toggle
                    key={index}
                    size={"sm"}
                    variant={"outline"}
                    color={bg}
                    disabled
                    className={`col-span-1 text-xs text-zinc-300 data-[state=on]:text-zinc-900 dark:text-zinc-600 data-[state=on]:dark:text-zinc-200 min-[450px]:w-10`}
                  >
                    {day.id + (index + 1)}
                  </Toggle>
                );
              }
              return (
                <Toggle
                  key={index}
                  size={"sm"}
                  variant={"outline"}
                  color={bg}
                  disabled={
                    maxSelection !== undefined &&
                    (value ?? []).length == maxSelection &&
                    !value?.includes(period)
                  }
                  className={`col-span-1 text-xs text-zinc-400 data-[state=on]:text-zinc-950 dark:text-zinc-600 data-[state=on]:dark:text-zinc-200 min-[450px]:w-10`}
                  onClick={() => updateList(period)}
                >
                  {day.id + (index + 1)}
                </Toggle>
              );
            })}
          </>
        </React.Fragment>
      ))}
    </div>
  );
};

export default HourGrid;
