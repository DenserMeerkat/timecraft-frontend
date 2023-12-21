"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { useAppContext } from "@/lib/AppStateContext";
import { AddSubject } from "./AddSubject";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "../skeleton/TableSkeleton";

const SubjectTable = () => {
  const { subjects } = useAppContext();

  return (
    <div className="min-h-[200px] mb-12">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading Icon={GraduationCap} title={"Subjects"} />
        <AddSubject />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={subjects} />
      </Suspense>
    </div>
  );
};

export default SubjectTable;
