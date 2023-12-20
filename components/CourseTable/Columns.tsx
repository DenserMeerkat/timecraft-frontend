"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/lib/types";
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
import { useAppContext } from "@/lib/AppStateContext";

const AvailableCell = (props: any) => {
  const { available } = props;
  const state = useAppContext();
  const { hours, days } = state;

  function resolveCell(hour: number) {
    let cell: string = "";
    const day = Math.floor(hour / hours!);
    const hourWithinDay = (hour % hours!) + 1;
    cell = String.fromCharCode(65 + day);
    cell += hourWithinDay;
    return cell;
  }

  return (
    <div className="flex gap-2 w-fit">
      {available.map((hour: number, index: number) => (
        <div
          key={index}
          className="text-xs px-2 py-1 rounded-md bg-sky-200 dark:bg-sky-400/[0.4]"
        >
          {resolveCell(hour)}
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
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "available",
    header: "Available Hours",
    cell: ({ row }) => {
      const available: number[] = row.original.available;

      return <AvailableCell available={available} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-end">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-cyan-700 focus:text-cyan-700 dark:text-cyan-500 dark:focus:text-cyan-500">
              <PenSquare className="h-4 w-4 mr-2" />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-rose-700 focus:text-rose-700 dark:text-rose-500 dark:focus:text-rose-500"
              onClick={() => {}}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
