"use client";

import React from "react";
import { useAppContext } from "@/components/context/AppStateContext";
import CraftTable from "./CraftTable";

const CraftTables = () => {
  const { response } = useAppContext();
  if (response.timetable.length === 0) return null;
  return (
    <div>
      {response.timetable.map((timeTable, i) => (
        <CraftTable
          key={i}
          studentGroup={response.studentGroups[i]}
          events={response.events}
          studentGroups={response.studentGroups}
          timetable={response.timetable}
        />
      ))}
    </div>
  );
};

export default CraftTables;
