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
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const handleUnselect = React.useCallback(
      (item: Record<string, string>) => {
        onChange((selected) =>
          selected.filter((item1) => item1.id !== item.id),
        );
      },
      [onChange],
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
      [onChange, selected],
    );

    const selectables = data.filter((item) => !selected.includes(item));

    return (
      <div
        className={clsx(
          label && "gap-1.5",
          parentClassName,
          "grid w-full items-center",
          disabled && "cursor-not-allowed",
        )}
      >
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="border-input group rounded-md border px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1">
              {selected.map((item, index) => {
                return (
                  <Badge key={item.value} variant="secondary">
                    {item.id}
                    <button
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
                      onClick={() => handleUnselect(item)}
                    >
                      <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
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
                  "placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none",
                  disabled && "cursor-not-allowed",
                )}
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && selectables.length > 0 ? (
              <div className="bg-popover text-popover-foreground absolute top-0 w-full rounded-md border bg-zinc-50 shadow-md outline-none animate-in dark:border-zinc-700 dark:bg-zinc-950">
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
                                  (item) => item.id !== framework.id,
                                )
                              : [...selected, framework],
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selected?.some((item) => item.id === framework.id)
                              ? "opacity-100"
                              : "opacity-0",
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
  },
);

MultiSelect.displayName = "MultiSelect";
