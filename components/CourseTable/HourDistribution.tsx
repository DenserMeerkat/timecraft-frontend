import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type ItemType = { code: string; name?: string };

export interface HourDistributonProps<T extends ItemType> {
  max: number;
  data: T[];
  value: number[];
  disabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<number[]>>;
}

const HourDistribution = React.forwardRef(
  (
    { max, data, value, disabled, onChange }: HourDistributonProps<any>,
    ref,
  ) => {
    const [defaultValues, setDefaultValues] = useState<number[]>([
      Math.floor(max / 2),
      Math.ceil(max / 2),
    ]);
    const gridCols = {
      display: "grid",
      gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))`,
      gap: "0.25rem",
      placeItems: "center",
      maxWidth: "100%",
    };
    const [firstColStyle, setFirstColStyle] = useState({
      gridColumn: `span ${defaultValues[0]}`,
    });
    const [secondColStyle, setSecondColStyle] = useState({
      gridColumn: `${defaultValues[0] + 1} / span ${defaultValues[1]}`,
    });

    useEffect(() => {
      setFirstColStyle({ gridColumn: `span ${defaultValues[0]}` });
      setSecondColStyle({
        gridColumn: `${defaultValues[0] + 1} / span ${defaultValues[1]}`,
      });
      onChange(defaultValues);
    }, [onChange, defaultValues]);

    if (disabled) {
      return (
        <div className="pb-2">
          <div
            className={cn(
              "rounded-md border border-zinc-200 px-2 py-1.5 dark:border-zinc-800",
              { "cursor-not-allowed opacity-70": disabled },
            )}
          >
            <p className="text-popover-foreground pl-2">Hours required</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pb-2">
          <div
            className={cn(
              "flex flex-col space-y-4 rounded-md border border-zinc-200 px-2 py-2 dark:border-zinc-800",
            )}
          >
            <div className="flex flex-col space-y-2">
              {data?.map((item, index) => {
                return (
                  <HourDistributionItem
                    key={index}
                    item={item}
                    index={index}
                    values={defaultValues}
                    setValues={setDefaultValues}
                    max={max}
                  />
                );
              })}
            </div>
            <div
              style={gridCols}
              className={
                "grid h-3 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-800"
              }
            >
              <span
                style={firstColStyle}
                className={
                  "h-full w-full rounded-full bg-teal-200 dark:bg-teal-400/40"
                }
              ></span>
              <span
                style={secondColStyle}
                className={
                  "h-full w-full rounded-full bg-blue-200 dark:bg-blue-400/40"
                }
              ></span>
            </div>
          </div>
        </div>
      );
    }
  },
);

export default HourDistribution;

const HourDistributionItem = (props: any) => {
  const { item, index, values, setValues, max } = props;
  return (
    <div className="flex items-center justify-between px-2">
      <p
        className={cn(
          "rounded-md px-2 py-1 text-center text-sm tracking-widest",
          index === 0
            ? "bg-teal-200 dark:bg-teal-400/40"
            : "bg-blue-200 dark:bg-blue-400/40",
        )}
      >
        {item.code}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={"secondary"}
          size={"smallIcon"}
          disabled={values[index] == 1}
          onClick={() => {
            const newValues = [...values];
            newValues[index] = newValues[index] - 1;
            newValues[index === 0 ? 1 : 0] = newValues[index === 0 ? 1 : 0] + 1;
            setValues(newValues);
          }}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <p className="mx-0.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-sm dark:border-zinc-800">
          {values[index]}
        </p>
        <Button
          type="button"
          variant={"secondary"}
          size={"smallIcon"}
          disabled={values[index] == max - 1}
          onClick={() => {
            const newValues = [...values];
            newValues[index] = newValues[index] + 1;
            newValues[index === 0 ? 1 : 0] = newValues[index === 0 ? 1 : 0] - 1;
            setValues(newValues);
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

HourDistribution.displayName = "HourDistribution";
