"use client";

import React from "react";
import { useAppContext } from "@/components/context/AppStateContext";
import GroupTimetable from "./GroupTimetables";
import FacultyTimetables from "./FacultyTimetables";

const CraftTables = () => {
  const { response } = useAppContext();
  if (response.timetable.length === 0) return null;
  return (
    <div>
      <GroupTimetable
        events={response.events}
        studentGroups={response.studentGroups}
        timetable={response.timetable}
      />
      <FacultyTimetables
        events={response.events}
        studentGroups={response.studentGroups}
        timetable={response.timetable}
      />
    </div>
  );
};

export default CraftTables;
