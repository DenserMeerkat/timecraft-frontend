"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/common/DataTable";
import { useAppContext } from "@/components/context/AppStateContext";
import { CalendarPlus } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { AddEvent } from "./AddEvent";
import AddDialog from "@/components/common/AddDialog";
import { columns } from "./Columns";

const EventTable = () => {
  const { jointCourses } = useAppContext();

  return (
    <div className="mb-12 mt-16 min-h-[200px]">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeading Icon={CalendarPlus} title={"Events"} />
        <AddDialog itemName={"Event"} Content={AddEvent} />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={jointCourses} />
      </Suspense>
    </div>
  );
};

export default EventTable;
