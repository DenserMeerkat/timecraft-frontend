"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import AddDialog from "@/components/common/AddDialog";
import { useAppContext } from "@/lib/AppStateContext";
import { AddFaculty } from "./AddFaculty";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "../skeleton/TableSkeleton";
import { cn } from "@/lib/utils";

const FacultyTable = (props: any) => {
  const className: string = props.className;
  const { faculties } = useAppContext();

  return (
    <div className={cn("min-h-[200px] my-6 w-full", className)}>
      <div className="flex items-center justify-between mb-8">
        <SectionHeading Icon={GraduationCap} title={"Faculties"} />
        <AddDialog itemName={"Faculty"} Content={AddFaculty} />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={faculties} />
      </Suspense>
    </div>
  );
};

export default FacultyTable;
