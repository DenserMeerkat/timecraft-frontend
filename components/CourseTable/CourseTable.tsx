"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import { useAppContext } from "@/lib/AppStateContext";
import { AddCourse } from "./AddCourse";
import SectionHeading from "../common/SectionHeading";
import { BookOpen } from "lucide-react";
import { TableSkeleton } from "../skeleton/TableSkeleton";

const CourseTable = () => {
  const { courses } = useAppContext();

  return (
    <div className=" min-h-[200px] my-6">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading Icon={BookOpen} title={"Courses"} />
        <AddDialog itemName={"Course"} Content={AddCourse} />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={courses} />
      </Suspense>
    </div>
  );
};

export default CourseTable;
