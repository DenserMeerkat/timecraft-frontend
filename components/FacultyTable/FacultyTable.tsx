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
  const data: Faculty[] = [
    {
      code: "FAC001",
      name: "John Doe",
      workload: 20,
      occupied: [2, 4, 6],
    },
    {
      code: "FAC002",
      name: "Jane Smith",
      workload: 18,
      occupied: [1, 3, 5],
    },
    {
      code: "FAC003",
      name: "Michael Johnson",
      workload: 22,
      occupied: [1, 2, 3],
    },
    {
      code: "FAC004",
      name: "Emily Williams",
      workload: 17,
      occupied: [4, 5, 6, 7, 8],
    },
    {
      code: "FAC005",
      name: "Daniel Brown",
      workload: 19,
      occupied: [1, 2, 6, 4, 7, 8],
    },
    {
      code: "FAC006",
      name: "Olivia Davis",
      workload: 21,
      occupied: [3, 4, 5],
    },
  ];
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
