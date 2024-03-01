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
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value);
    const [selectable, setSelectable] = React.useState(
      data.filter((item) => !value.includes(item))
    );
    const [inputValue, setInputValue] = React.useState("");
    const disabled = data.length === 0;

    const handleUnselect = React.useCallback(
      (item: Course) => {
        const newSelected = selected.filter((i) => i.code !== item.code);
        setSelected(newSelected);
        if (newSelected.length > 0) {
          const hours = newSelected[0].hours;
          setSelectable((prev) => prev.filter((i) => i.hours === hours));
        } else {
          setSelectable(data);
        }
        onChange(newSelected);
      },
      [onChange, selected, data]
    );

    const handleSelect = React.useCallback(
      (item: Course) => {
        setInputValue("");
        if (!selected.includes(item)) {
          setSelected((prev) => [...prev, item]);
          setSelectable((prev) => prev.filter((i) => i.hours === item.hours));
          onChange([...selected, item]);
        }
      },
      [onChange, selected]
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
                  const hours = newSelected[0].hours;
                  setSelectable((prev) =>
                    prev.filter((i) => i.hours === hours)
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
                  const hours = newSelected[0].hours;
                  setSelectable((prev) =>
                    prev.filter((i) => i.hours === hours)
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
      [onChange, data, selected]
    );

    React.useEffect(() => {
      if (selected.length > 0) {
        const hours = selected[0].hours;
        setSelectable(
          data.filter(
            (item) => item.hours === hours && !selected.includes(item)
          )
        );
      } else {
        setSelectable(data);
      }
      if (maxSelectable && selected.length === maxSelectable) {
        setInputValue("");
        setOpen(false);
      }
    }, [value, data, selected, maxSelectable, selectable]);

    return (
      <div
        className={cn(
          label && "gap-1.5",
          parentClassName,
          "grid w-full items-center",
          disabled && "cursor-not-allowed"
        )}
      >
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="group border border-input dark:border-zinc-800 px-3 py-2 text-sm rounded-md focus-within:ring-1 focus-within:ring-zinc-100">
            <div className="flex gap-1 flex-wrap">
              {selected.map((item) => {
                return (
                  <Badge key={item.code} variant="secondary">
                    {item.code}
                    <button
                      type="button"
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
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
                  "ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 w-8",
                  disabled && "cursor-not-allowed"
                )}
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && selectable.length > 0 ? (
              <div className="bg-zinc-50 dark:bg-zinc-950 absolute w-full top-0 rounded-md border dark:border-zinc-700 bg-popover z-10 text-popover-foreground shadow-md outline-none animate-in">
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
                          "cursor-pointer flex items-center gap-2 justify-between"
                        }
                      >
                        {item.code}
                        <span>{item.hours}</span>
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
  }
);

export default MultiCourseSelect;

MultiCourseSelect.displayName = "MultiCourseSelect";
