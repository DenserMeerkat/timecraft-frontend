"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Faculty } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import { useAppContext } from "@/lib/AppStateContext";
import { AddFaculty } from "./AddFaculty";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { TableSkeleton } from "../common/TableSkeleton";

const FacultyTable = () => {
  const { faculties } = useAppContext();

  return (
    <div className=" min-h-[200px] mb-10">
      <SectionHeading Icon={GraduationCap} title={"Faculties"} />
      <Suspense fallback={<TableSkeleton />}>
        <DataTable
          columns={columns}
          data={faculties}
          filterString={"name"}
          addDialog={<AddDialog itemName={"Faculty"} Content={AddFaculty} />}
        />
      </Suspense>
    </div>
  );
};

export default FacultyTable;
