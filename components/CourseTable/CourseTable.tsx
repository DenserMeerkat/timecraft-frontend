"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Course } from "@/lib/types";
import AddDialog from "@/components/common/AddDialog";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppStateContext";
import HourGrid from "../common/HourGrid";

const CourseTable = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
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
          data={data}
          filterString={"name"}
          addDialog={
            <AddDialog itemName={"Course"} Content={AddCourseContent} />
          }
        />
      </div>
    );
};

export default CourseTable;

const AddCourseContent = (props: any) => {
  const { open, setOpen } = props;
  const { hours, days } = useAppContext();
  const availableList: number[] = [];
  const closeAlertDialog = () => {
    setOpen(false);
  };
  return (
    <AlertDialogContent className="sm:max-w-[425px]">
      <AlertDialogHeader>
        <AlertDialogTitle>New Course</AlertDialogTitle>
        <AlertDialogDescription>
          Create a new Course with unique code. Click add when you&apos;re done.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Code
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" placeholder="" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Hours
          </Label>
          <Input id="username" className="col-span-3" />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="busy" className="text-right col-span-1">
          Available
        </Label>
        <div id="busy" className={`col-span-3 gap-2`}>
          <HourGrid columns={hours} rows={days} bg="sky" list={availableList} />
        </div>
      </div>
      <AlertDialogFooter>
        <Button variant={"secondary"} type="button" onClick={closeAlertDialog}>
          Cancel
        </Button>
        <Button type="submit">Add Course</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
