"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import { useAppContext } from "@/lib/AppStateContext";
import { AddCourse } from "./AddCourse";

const CourseTable = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const { courses } = useAppContext();
  const data: Course[] = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      hours: 3,
      available: [8, 9, 10],
    },
    {
      code: "MATH202",
      name: "Advanced Mathematics",
      hours: 4,
      available: [12, 13, 14],
    },
    {
      code: "ENG150",
      name: "English Composition",
      hours: 3,
      available: [10, 11, 12],
    },
    {
      code: "PHYS100",
      name: "Physics Fundamentals",
      hours: 4,
      available: [14, 15, 16],
    },
    {
      code: "CHEM110",
      name: "Chemistry Basics",
      hours: 3,
      available: [9, 10, 11],
    },
    {
      code: "ART220",
      name: "Introduction to Art",
      hours: 2,
      available: [16, 17],
    },
    {
      code: "HIST101",
      name: "World History",
      hours: 3,
      available: [13, 14, 15],
    },
    {
      code: "BIO210",
      name: "Biology Concepts",
      hours: 4,
      available: [11, 12, 13],
    },
    {
      code: "ECON201",
      name: "Microeconomics",
      hours: 3,
      available: [15, 16, 17],
    },
    {
      code: "LANG305",
      name: "Advanced Language Studies",
      hours: 4,
      available: [9, 10, 11],
    },
  ];
  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);
  if (!isDomLoaded) return <div></div>;
  else
    return (
      <div className="">
        <DataTable
          columns={columns}
          data={courses}
          filterString={"name"}
          addDialog={<AddDialog itemName={"Course"} Content={AddCourse} />}
        />
      </div>
    );
};

export default CourseTable;
