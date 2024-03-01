"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
// import { columns } from "./Columns";
import { useAppContext } from "@/components/context/AppStateContext";
// import { AddEvent } from "./AddEvent";
import { CalendarPlus } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "../skeleton/TableSkeleton";
import { AddEvent } from "./AddEvent";
import AddDialog from "../common/AddDialog";

const EventTable = () => {
  const { subjects } = useAppContext();

  return (
    <div className="mb-12 min-h-[200px]">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeading Icon={CalendarPlus} title={"Events"} />
        <AddDialog itemName={"Event"} Content={AddEvent} />
      </div>
      {/* <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={subjects} />
      </Suspense> */}
    </div>
  );
};

export default EventTable;
