"use client";
import React, { Suspense } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import { useAppContext } from "@/components/context/AppStateContext";
import { AddCourse } from "./AddCourse";
import SectionHeading from "../common/SectionHeading";
import { BookOpen } from "lucide-react";
import { TableSkeleton } from "../skeleton/TableSkeleton";
import { cn } from "@/lib/utils";

const CourseTable = (props: any) => {
  const className: string = props.className;
  const { courses } = useAppContext();

  return (
    <div className={cn("my-6 min-h-[200px] w-full", className)}>
      <div className="mb-8 flex items-center justify-between">
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
