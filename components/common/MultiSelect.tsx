"use client";
import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { ItemType } from "@/lib/types";

export interface MultiSelectProps<T extends ItemType> {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: T[];
  value: T[];
  onChange: React.Dispatch<React.SetStateAction<T[]>>;
  maxSelectable?: number;
  disabled?: boolean;
}

export const MultiSelect = React.forwardRef(
  (
    {
      label,
      placeholder,
      parentClassName,
      data,
      value,
      onChange,
      maxSelectable,
      disabled,
    }: MultiSelectProps<any>,
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value);
    const [selectable, setSelectable] = React.useState(
      data.filter((item) => !value.includes(item)),
    );
    const [inputValue, setInputValue] = React.useState("");
    const isDisabled = disabled || data.length === 0;

    const handleUnselect = React.useCallback(
      (item: ItemType) => {
        const newSelected = selected.filter((i) => i.code !== item.code);
        setSelected(newSelected);
        setSelectable((prev) => [...prev, item]);
        onChange(newSelected);
      },
      [onChange, selected],
    );

    const handleSelect = React.useCallback(
      (item: ItemType) => {
        setInputValue("");
        if (!selected.includes(item)) {
          setSelected((prev) => [...prev, item]);
          setSelectable((prev) => prev.filter((i) => i !== item));
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
                return newSelected;
              });
              setSelectable((prev) => {
                const last = selected[selected.length - 1];
                return [...prev, last];
              });
              onChange(() => {
                const newSelected = [...value];
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
      [onChange, value, selected],
    );

    React.useEffect(() => {
      setSelectable(data.filter((item) => !selected.includes(item)));
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
          isDisabled && "cursor-not-allowed",
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
                      disabled={isDisabled}
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
                disabled={
                  isDisabled ||
                  (maxSelectable != null && value.length === maxSelectable)
                }
                placeholder={placeholder}
                className={cn(
                  "placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none",
                  isDisabled && "cursor-not-allowed",
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
                        className={"cursor-pointer"}
                      >
                        {item.code}
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

export default MultiSelect;

MultiSelect.displayName = "MultiSelect";
