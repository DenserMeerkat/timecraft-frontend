"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CourseTable = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
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
  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);
  if (!isDomLoaded) return <div></div>;
  else
    return (
      <div className="">
        <DataTable
          columns={columns}
          data={data}
          filterString={"name"}
          addDialog={
            <AddDialog itemName={"Course"} content={<AddCourseContent />} />
          }
        />
      </div>
    );
};

export default CourseTable;

const AddCourseContent = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogDescription>
          Create a new Course with unique code. Click add when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Course</Button>
      </DialogFooter>
    </DialogContent>
  );
};
