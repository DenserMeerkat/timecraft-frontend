"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Course, Faculty } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PenSquare, Trash2 } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { cn } from "@/lib/utils";
import HourDistribution from "./HourDistribution";

const FacultyCell = (props: any) => {
  const { faculties } = props;
  return (
    <div className="flex w-fit flex-col gap-2">
      {faculties.map((code: string, index: number) => (
        <div
          key={index}
          className={cn(
            "rounded-md px-2 py-1 text-xs",
            index === 0
              ? "bg-teal-200 dark:bg-teal-400/40"
              : "bg-blue-200 dark:bg-blue-400/40",
          )}
        >
          {code}
        </div>
      ))}
    </div>
  );
};

export const columns: ColumnDef<Course>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-1 md:pr-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "studentGroup",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          StudentGroup
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("studentGroup")}</div>,
  },
  {
    accessorKey: "hours",
    header: "Hours",
    cell: ({ row }) => <div>{row.getValue("hours")}</div>,
  },
  {
    accessorKey: "faculties",
    header: "Faculties",
    cell: ({ row }) => {
      const faculties: Faculty[] = row.getValue("faculties");
      const hoursDistribution: number[] = row.getValue("hoursDistribution") ?? [
        row.getValue("hours"),
      ];
      return (
        <div className="flex w-fit flex-col gap-2">
          {faculties.map((faculty, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-md px-2 py-1 text-xs",
                  index === 0
                    ? "bg-teal-200 dark:bg-teal-400/40"
                    : "bg-blue-200 dark:bg-blue-400/40",
                )}
              >
                {faculty.code}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "hoursDistribution",
    header: "Hour Distribution",
    cell: ({ row }) => {
      const hoursDistribution: number[] = row.getValue("hoursDistribution") ?? [
        row.getValue("hours"),
      ];
      return (
        <div className="flex w-fit flex-col gap-2">
          {hoursDistribution.map((hours, index: number) => (
            <div
              key={index}
              className={cn(
                "rounded-md px-2 py-1 text-xs",
                index === 0
                  ? "bg-teal-200 dark:bg-teal-400/40"
                  : "bg-blue-200 dark:bg-blue-400/40",
              )}
            >
              {hours}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <div className="flex justify-end">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-cyan-700 focus:text-cyan-700 dark:text-cyan-500 dark:focus:text-cyan-500">
              <PenSquare className="mr-2 h-4 w-4" />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-rose-700 focus:text-rose-700 dark:text-rose-500 dark:focus:text-rose-500"
              onClick={() => {}}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
