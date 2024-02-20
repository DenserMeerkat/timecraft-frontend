"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
// import { columns } from "./Columns";
import { useAppContext } from "@/lib/AppStateContext";
// import { AddEvent } from "./AddEvent";
import { CalendarPlus } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "../skeleton/TableSkeleton";
import { AddEvent } from "./AddEvent";
import AddDialog from "../common/AddDialog";

const EventTable = () => {
  const { subjects } = useAppContext();

  return (
    <div className="min-h-[200px] mb-12">
      <div className="flex items-center justify-between mb-8">
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
