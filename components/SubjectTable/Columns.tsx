"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/lib/types";
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

export const columns: ColumnDef<Subject>[] = [
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "faculties",
    header: "Faculties",
    cell: ({ row }) => {
      const items: string[] = row.original.faculties
        ? row.original.faculties.map((faculty) => faculty.code)
        : [];

      return <ItemsCell items={items} type={0} />;
    },
  },
  {
    accessorKey: "courses",
    header: "Courses",
    cell: ({ row }) => {
      const items: string[] = row.original.courses
        ? row.original.courses.map((course) => course.code)
        : [];

      return <ItemsCell items={items} type={1} />;
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

const ItemsCell = (props: any) => {
  const { items, type } = props;
  return (
    <div className="flex gap-2 w-fit">
      {items?.map((item: string, index: number) => (
        <div
          key={index}
          className={`text-xs px-2 py-1 rounded-md ${
            type == 0
              ? "bg-rose-200 dark:bg-rose-400/[0.4] "
              : "bg-cyan-200 dark:bg-cyan-400/[0.4] "
          } `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
