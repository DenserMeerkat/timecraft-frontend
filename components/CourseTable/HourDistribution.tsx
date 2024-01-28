import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ItemType = { code: string; name?: string };

export interface HourDistributonProps<T extends ItemType> {
  max: number;
  data: T[];
  value: number[];
  disabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<number[]>>;
}

const HourDistribution = ({
  max,
  data,
  value,
  disabled,
  onChange,
}: HourDistributonProps<any>) => {
  const [defaultValues, setDefaultValues] = useState<number[]>(
    value ?? [Math.floor(max / 2), Math.ceil(max / 2)]
  );
  if (disabled) {
    return (
      <div
        className={cn(
          "border rounded-md px-2 py-1.5 border-zinc-200 dark:border-zinc-800",
          { "cursor-not-allowed opacity-70": disabled }
        )}
      >
        <p className="pl-2 text-popover-foreground">Hours required</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default HourDistribution;
