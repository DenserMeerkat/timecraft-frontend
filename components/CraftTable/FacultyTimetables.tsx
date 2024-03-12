import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Event, FacultyClass, FacultyTimeTable } from "@/lib/types";
import { generateFacultyTimeTables } from "@/lib/functions";
import { useAppContext } from "@/components/context/AppStateContext";

export interface FacultyTimetablesProps {
  events: Event[];
  studentGroups: string[];
  timetable: number[][];
}

const FacultyTimetables = (props: FacultyTimetablesProps) => {
  const { faculties } = useAppContext();
  const events = props.events;
  const studentGroups = props.studentGroups;
  const timetable = props.timetable;
  const facultyTimeTables: FacultyTimeTable[] = React.useMemo(
    () => generateFacultyTimeTables(events, timetable, studentGroups),
    [events, timetable, studentGroups],
  );
  const [activeFaculty, setActiveFaculty] = useState(facultyTimeTables[0]);
  return (
    <div>
      <Select
        value={activeFaculty.facultyCode}
        onValueChange={(value) =>
          setActiveFaculty(
            facultyTimeTables.find((faculty) => faculty.facultyCode === value)!,
          )
        }
      >
        <SelectTrigger className="mx-auto max-w-[260px] rounded-xl">
          <div className="flex items-center space-x-3">
            <span className="min-w-[48px] rounded-md bg-zinc-100 px-1 py-0.5 text-center text-xs dark:bg-zinc-800">
              {activeFaculty.facultyCode}
            </span>
            <span className="text-start">
              {
                faculties.find(
                  (faculty) => faculty.code === activeFaculty.facultyCode,
                )?.name
              }
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectGroup>
            {facultyTimeTables.map((faculty, i) => (
              <SelectItem
                key={i}
                value={faculty.facultyCode}
                className="rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="min-w-[48px] rounded-md bg-zinc-100 px-1 py-0.5 text-center text-xs dark:bg-zinc-800">
                    {faculty.facultyCode}
                  </span>
                  <span className="text-start">
                    {
                      faculties.find((fac) => fac.code === faculty.facultyCode)
                        ?.name
                    }
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FacultyTimetable
        facultyCode={activeFaculty.facultyCode}
        classes={activeFaculty.classes}
      />
    </div>
  );
};

export default FacultyTimetables;

const FacultyTimetable = (props: FacultyTimeTable) => {
  const { days, hours } = useAppContext();
  const facultyCode = props.facultyCode;
  const classes = props.classes;
  const _columns: number = Number(hours) + 1;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `minmax(60px, 0.5fr) repeat(${
      _columns - 1
    }, minmax(100px, 120px))`,
  };
  console.log(classes);
  const periods: (FacultyClass | null)[][] = Array.from(
    { length: days! },
    (_, i) => {
      return Array.from({ length: hours! }, (_, j) => {
        const index = i * hours! + j;
        return classes.find((cls) => cls.timetable.includes(index)) || null;
      });
    },
  );
  return (
    <div className="mx-auto mb-12 mt-8 w-full max-w-fit overflow-auto rounded-lg border dark:border-zinc-800">
      <div
        style={gridStyle}
        className="min-w-fit place-items-center gap-1 p-1 sm:gap-2 sm:p-2 md:gap-3 md:p-2.5 lg:gap-4 lg:p-3 xl:gap-5 xl:p-3.5 2xl:gap-6 2xl:p-4"
      >
        <div className="box-content grid min-w-[40px] place-content-center rounded-md bg-lime-100 px-1 py-1 dark:bg-lime-800/50 md:px-2">
          <span className="text-xs font-medium tracking-wider">
            {facultyCode}
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
                {period ? (
                  <div className="flex h-full min-h-[30px] w-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 md:min-h-[40px]">
                    <span className="text-xs font-medium tracking-wider ">
                      {period.studentGroup}
                    </span>
                  </div>
                ) : (
                  <div className="h-full min-h-[30px] w-full rounded-md bg-zinc-50 dark:bg-zinc-900/40 md:min-h-[40px]"></div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
