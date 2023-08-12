import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";

const CourseTable = () => {
  const data: Course[] = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      hours: 3,
      fixedHours: [8, 9, 10],
    },
    {
      code: "MATH202",
      name: "Advanced Mathematics",
      hours: 4,
      fixedHours: [12, 13, 14],
    },
    {
      code: "ENG150",
      name: "English Composition",
      hours: 3,
      fixedHours: [10, 11, 12],
    },
    {
      code: "PHYS100",
      name: "Physics Fundamentals",
      hours: 4,
      fixedHours: [14, 15, 16],
    },
    {
      code: "CHEM110",
      name: "Chemistry Basics",
      hours: 3,
      fixedHours: [9, 10, 11],
    },
    {
      code: "ART220",
      name: "Introduction to Art",
      hours: 2,
      fixedHours: [16, 17],
    },
    {
      code: "HIST101",
      name: "World History",
      hours: 3,
      fixedHours: [13, 14, 15],
    },
    {
      code: "BIO210",
      name: "Biology Concepts",
      hours: 4,
      fixedHours: [11, 12, 13],
    },
    {
      code: "ECON201",
      name: "Microeconomics",
      hours: 3,
      fixedHours: [15, 16, 17],
    },
    {
      code: "LANG305",
      name: "Advanced Language Studies",
      hours: 4,
      fixedHours: [9, 10, 11],
    },
  ];
  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        filterString={"name"}
        itemName={"Course"}
      />
    </div>
  );
};

export default CourseTable;
