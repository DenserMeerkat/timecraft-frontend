import React from "react";
import { Event } from "@/lib/types";
import { useAppContext } from "@/components/context/AppStateContext";
import { cn } from "@/lib/utils";

type CraftTableProps = {
  studentGroup: string;
  events: Event[];
  studentGroups: string[];
  timetable: number[][];
};

const CraftTable = (props: CraftTableProps) => {
  const { hours, days } = useAppContext();
  const timeTable =
    props.timetable[props.studentGroups.indexOf(props.studentGroup)];
  let periods: number[][] = [];
  for (let i = 0; i < timeTable.length; i += hours!) {
    const day = timeTable.slice(i, i + hours!);
    periods.push(day);
  }
  const events = props.events;
  const _columns: number = Number(hours) + 1;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `minmax(50px, 0.5fr) repeat(${
      _columns - 1
    }, minmax(100px, 120px))`,
  };

  return (
    <div className="mx-auto mb-12 mt-8 w-full max-w-fit overflow-auto rounded-lg border dark:border-zinc-700">
      <div
        style={gridStyle}
        className="min-w-fit place-items-center gap-1 p-1 sm:gap-2 sm:p-2 md:gap-3 md:p-2.5 lg:gap-4 lg:p-3 xl:gap-5 xl:p-3.5 2xl:gap-6 2xl:p-4"
      >
        <div></div>
        {Array.from({ length: hours! }, (_, i) => (
          <div key={i}>
            <p className="text-center">Hour {i + 1}</p>
          </div>
        ))}
        {periods.map((day, i) => (
          <React.Fragment key={i}>
            <p className="text-center"> Day {i + 1}</p>
            {day.map((period, j) => (
              <div
                key={j}
                className="flex h-full w-full flex-col items-center justify-center space-y-1 rounded-md "
              >
                {events[period].classes.map((event, k) => {
                  return (
                    <div
                      key={k}
                      className={cn(
                        "grid h-full min-h-[30px] w-full place-content-center rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800/40",
                        { "min-h-[50px]": events[period].classes.length == 1 },
                      )}
                    >
                      <p className="text-xs font-medium xl:text-sm">
                        {event.courseCode}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CraftTable;
