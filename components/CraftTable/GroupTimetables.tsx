import React from "react";
import { Event } from "@/lib/types";
import { useAppContext } from "@/components/context/AppStateContext";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupTimetablesProps {
  events: Event[];
  studentGroups: string[];
  timetable: number[][];
}

interface GroupTimetableProps extends GroupTimetablesProps {
  studentGroup: string;
}

const GroupTimetables = (props: GroupTimetablesProps) => {
  const studentGroups = props.studentGroups;
  const events = props.events;
  const timetable = props.timetable;
  const [activeGroup, setActiveGroup] = React.useState(studentGroups[0]);

  return (
    <Tabs
      value={activeGroup}
      onValueChange={setActiveGroup}
      className="mx-auto mt-12 "
    >
      <TabsList className="mx-auto flex w-fit space-x-2 md:h-10">
        {studentGroups.map((group, i) => (
          <TabsTrigger
            key={i}
            value={group}
            className="rounded-md px-3 py-1.5 text-xs md:text-sm"
          >
            {group}
          </TabsTrigger>
        ))}
      </TabsList>
      {studentGroups.map((group, i) => (
        <TabsContent
          key={i}
          value={group}
          className="mx-auto mb-12 mt-8 w-full max-w-fit overflow-auto rounded-lg border dark:border-zinc-800"
        >
          <GroupTimetable
            key={i}
            studentGroup={group}
            events={events}
            studentGroups={studentGroups}
            timetable={timetable}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default GroupTimetables;

const GroupTimetable = (props: GroupTimetableProps) => {
  const { hours } = useAppContext();
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
    gridTemplateColumns: `minmax(60px, 0.5fr) repeat(${
      _columns - 1
    }, minmax(100px, 120px))`,
  };

  return (
    <div
      style={gridStyle}
      className="min-w-fit place-items-center gap-1 p-1 sm:gap-2 sm:p-2 md:gap-3 md:p-2.5 lg:gap-4 lg:p-3 xl:gap-5 xl:p-3.5 2xl:gap-6 2xl:p-4"
    >
      <div className="box-content grid place-content-center rounded-md bg-lime-100 px-1 py-1 dark:bg-lime-800/50 md:px-2">
        <span className="text-xs font-medium tracking-wider">
          {props.studentGroup}
        </span>
      </div>
      {Array.from({ length: hours! }, (_, i) => (
        <div
          key={i}
          className="box-content grid place-content-center rounded-md bg-zinc-100 px-1 py-1 dark:bg-zinc-900 md:px-2.5"
        >
          <span className="text-xs font-medium tracking-wider">
            Hour {i + 1}
          </span>
        </div>
      ))}
      {periods.map((day, i) => (
        <React.Fragment key={i}>
          <div
            key={i}
            className="box-content grid place-content-center rounded-md bg-zinc-100 px-1 py-1 dark:bg-zinc-900 md:px-2.5"
          >
            <span className="text-xs font-medium tracking-wider">
              Day {i + 1}
            </span>
          </div>
          {day.map((period, j) => (
            <div
              key={j}
              className="flex h-full w-full flex-col items-center justify-center space-y-1 rounded-md "
            >
              {events[period].classes.map((clas, k) => {
                return (
                  <div
                    key={k}
                    className={cn(
                      "grid h-full min-h-[30px] w-full place-content-center rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800/40",
                      {
                        "min-h-[40px] md:min-h-[50px]":
                          events[period].classes.length == 1,
                      },
                    )}
                  >
                    <p className="text-xs font-medium xl:text-sm">
                      {clas.courseCode}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
