"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Faculty } from "@/lib/types";
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

const FacultyTable = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const data: Faculty[] = [
    {
      code: "FAC001",
      name: "John Doe",
      workload: 20,
      busy: [2, 4, 6],
    },
    {
      code: "FAC002",
      name: "Jane Smith",
      workload: 18,
      busy: [1, 3, 5],
    },
    {
      code: "FAC003",
      name: "Michael Johnson",
      workload: 22,
      busy: [1, 2, 3],
    },
    {
      code: "FAC004",
      name: "Emily Williams",
      workload: 17,
      busy: [4, 5, 6, 7, 8],
    },
    {
      code: "FAC005",
      name: "Daniel Brown",
      workload: 19,
      busy: [1, 2, 6, 4, 7, 8],
    },
    {
      code: "FAC006",
      name: "Olivia Davis",
      workload: 21,
      busy: [3, 4, 5],
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
            <AddDialog itemName={"Faculty"} content={<AddFacultyContent />} />
          }
        />
      </div>
    );
};

export default FacultyTable;

const AddFacultyContent = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Faculty</DialogTitle>
        <DialogDescription>
          Create a new Faculty with unique code. Click add when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Code
        </Label>
        <Input id="code" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" placeholder="" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="workload" className="text-right">
          Workload
        </Label>
        <Input id="workload" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="busy" className="text-right col-span-1">
          Occupied
        </Label>
        <div id="busy" className="col-span-3"></div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Faculty</Button>
      </DialogFooter>
    </DialogContent>
  );
};
