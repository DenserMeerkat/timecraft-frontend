import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Faculty } from "@/lib/types";

const FacultyTable = () => {
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
      busy: [4, 5, 6],
    },
    {
      code: "FAC005",
      name: "Daniel Brown",
      workload: 19,
      busy: [1, 2, 6],
    },
    {
      code: "FAC006",
      name: "Olivia Davis",
      workload: 21,
      busy: [3, 4, 5],
    },
  ];

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        filterString={"name"}
        itemName={"Faculty"}
      />
    </div>
  );
};

export default FacultyTable;
