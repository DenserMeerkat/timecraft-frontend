"use client";
import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/types";

export interface MultiCourseSelectProps {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: Course[];
  value: Course[];
  onChange: React.Dispatch<React.SetStateAction<Course[]>>;
  maxSelectable?: number;
}

export const MultiCourseSelect = React.forwardRef(
  (
    {
      label,
      placeholder,
      parentClassName,
      data,
      value,
      onChange,
      maxSelectable,
    }: MultiCourseSelectProps,
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value);
    const [selectable, setSelectable] = React.useState(
      data.filter((item) => !value.includes(item)),
    );
    const [inputValue, setInputValue] = React.useState("");
    const disabled = data.length === 0;

    const handleUnselect = React.useCallback(
      (item: Course) => {
        const newSelected = selected.filter((i) => i.code !== item.code);
        setSelected(newSelected);
        onChange(newSelected);
      },
      [onChange, selected],
    );

    const handleSelect = React.useCallback(
      (item: Course) => {
        setInputValue("");
        if (!selected.includes(item)) {
          setSelected((prev) => [...prev, item]);
          onChange([...selected, item]);
        }
      },
      [onChange, selected],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                if (newSelected.length > 0) {
                  setSelectable((prev) =>
                    prev.filter(
                      (i) =>
                        i.noHours === newSelected[0].noHours &&
                        i.studentGroup === newSelected[0].studentGroup,
                    ),
                  );
                } else {
                  setSelectable(data);
                }
                return newSelected;
              });
              setSelectable((prev) => {
                const last = selected[selected.length - 1];
                return [...prev, last];
              });
              onChange((prevSelected) => {
                const newSelected = [...prevSelected];
                newSelected.pop();
                if (newSelected.length > 0) {
                  const hours = newSelected[0].noHours;
                  setSelectable((prev) =>
                    prev.filter((i) => i.noHours === hours),
                  );
                } else {
                  setSelectable(data);
                }
                return newSelected;
              });
            }
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [onChange, data, selected],
    );

    React.useEffect(() => {
      if (selected.length > 0) {
        setSelectable(
          data.filter(
            (item) =>
              item.noHours === selected[0].noHours &&
              item.studentGroup === selected[0].studentGroup &&
              !selected.includes(item),
          ),
        );
      } else {
        setSelectable(data);
      }
      if (maxSelectable && selected.length === maxSelectable) {
        setInputValue("");
        setOpen(false);
      }
    }, [value, data, selected, maxSelectable]);

    return (
      <div
        className={cn(
          label && "gap-1.5",
          parentClassName,
          "grid w-full items-center",
          disabled && "cursor-not-allowed",
        )}
      >
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="border-input group rounded-md border px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1">
              {selected.map((item) => {
                return (
                  <Badge key={item.code} variant="secondary">
                    {item.code}
                    <button
                      type="button"
                      className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => {
                        handleUnselect(item);
                      }}
                    >
                      <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue ?? ""}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                disabled={
                  disabled ||
                  (maxSelectable != null && value.length === maxSelectable) ||
                  selectable.length === 0
                }
                placeholder={placeholder}
                className={cn(
                  "placeholder:text-muted-foreground ml-2 w-8 flex-1 bg-transparent outline-none",
                  disabled && "cursor-not-allowed",
                )}
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && selectable.length > 0 ? (
              <div className="bg-popover text-popover-foreground absolute top-0 z-10 w-full rounded-md border bg-zinc-50 shadow-md outline-none animate-in dark:border-zinc-700 dark:bg-zinc-950">
                <CommandGroup className="h-full overflow-auto">
                  {selectable.map((item) => {
                    return (
                      <CommandItem
                        key={item.code}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          handleSelect(item);
                        }}
                        className={
                          "flex cursor-pointer items-center justify-between gap-2"
                        }
                      >
                        {item.code}
                        <span>{item.noHours}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </div>
        </Command>
      </div>
    );
  },
);

export default MultiCourseSelect;

MultiCourseSelect.displayName = "MultiCourseSelect";
