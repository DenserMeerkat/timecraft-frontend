"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Faculty, Course, JointCourse } from "@/lib/types";
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
import { cn } from "@/lib/utils";
import { useAppContext } from "@/components/context/AppStateContext";
import { resolveHour } from "@/lib/functions";

export const columns: ColumnDef<JointCourse>[] = [
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
    accessorKey: "courses",
    header: "Courses",
    cell: ({ row }) => {
      const courses: Course[] = row.getValue("courses");

      return (
        <div className="flex w-fit gap-2">
          {courses.map((course, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-md px-2 py-1 text-xs",
                  "bg-stone-100 dark:bg-stone-600/40",
                )}
              >
                {course.code}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "fixedSlots",
    header: "Fixed Slots",
    cell: ({ row }) => {
      const fixedSlots: number[] | undefined = row.original.fixedSlots;

      return <FixedCell fixedSlots={fixedSlots} />;
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

const FixedCell = (props: any) => {
  const { fixedSlots } = props;
  const state = useAppContext();
  const { hours, days } = state;

  return (
    <div className="flex w-fit gap-2">
      {(fixedSlots ?? []).map((hour: number, index: number) => (
        <div
          key={index}
          className="rounded-md bg-blue-200 px-2 py-1 text-xs dark:bg-blue-400/40"
        >
          {resolveHour(hour, hours!)}
        </div>
      ))}
    </div>
  );
};
