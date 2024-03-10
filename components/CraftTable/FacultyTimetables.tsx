import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event, FacultyTimeTable } from "@/lib/types";
import { generateFacultyTimeTables } from "@/lib/functions";

export interface FacultyTimetablesProps {
  events: Event[];
  studentGroups: string[];
  timetable: number[][];
}

const FacultyTimetables = (props: FacultyTimetablesProps) => {
  const events = props.events;
  const studentGroups = props.studentGroups;
  const timetable = props.timetable;
  console.log(events, timetable);
  const facultyTimeTables: FacultyTimeTable[] = generateFacultyTimeTables(
    events,
    timetable,
    studentGroups,
  );
  console.log(facultyTimeTables);
  return <div></div>;
};

export default FacultyTimetables;
