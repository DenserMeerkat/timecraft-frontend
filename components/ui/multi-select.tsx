"use client";

import { X, Check } from "lucide-react";
import * as React from "react";

import clsx from "clsx";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface MultiSelectProps<T> {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: T[];
  selected: T[];
  onChange: React.Dispatch<React.SetStateAction<T[]>>;
}

export const MultiSelect = React.forwardRef<
  HTMLInputElement,
  MultiSelectProps<any>
>(
  (
    {
      label,
      placeholder,
      parentClassName,
      data,
      selected,
      onChange,
    }: MultiSelectProps<any>,
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const handleUnselect = React.useCallback(
      (item: Record<string, string>) => {
        onChange((selected) =>
          selected.filter((item1) => item1.id !== item.id)
        );
      },
      [onChange]
    );
    const disabled = data.length === 0;
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              onChange(() => {
                const newSelected = [...selected];
                newSelected.pop();
                return newSelected;
              });
            }
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [onChange, selected]
    );

    const selectables = data.filter((item) => !selected.includes(item));

    return (
      <div
        className={clsx(
          label && "gap-1.5",
          parentClassName,
          "grid w-full items-center",
          disabled && "cursor-not-allowed"
        )}
      >
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="group border border-input dark:border-zinc-800 px-3 py-2 text-sm rounded-md focus-within:ring-1 focus-within:ring-zinc-100">
            <div className="flex gap-1 flex-wrap">
              {selected.map((item, index) => {
                return (
                  <Badge key={item.value} variant="secondary">
                    {item.id}
                    <button
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
                      onClick={() => handleUnselect(item)}
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
                placeholder={placeholder}
                disabled={disabled}
                className={clsx(
                  "ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1",
                  disabled && "cursor-not-allowed"
                )}
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && selectables.length > 0 ? (
              <div className="bg-zinc-50 dark:bg-zinc-950 absolute w-full top-0 rounded-md border dark:border-zinc-700 bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((framework) => {
                    return (
                      <CommandItem
                        key={framework.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          onChange(
                            selected?.some((item) => item.id === framework.id)
                              ? selected.filter(
                                  (item) => item.id !== framework.id
                                )
                              : [...selected, framework]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selected?.some((item) => item.id === framework.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.id}
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
