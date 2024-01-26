import React from "react";

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
  return <div>HourDistribution</div>;
};

export default HourDistribution;
