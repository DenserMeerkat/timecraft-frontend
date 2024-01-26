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
}

export const MultiSelect = ({
  label,
  placeholder,
  parentClassName,
  data,
  value,
  onChange,
}: MultiSelectProps<any>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);
  const [selectable, setSelectable] = React.useState(
    data.filter((item) => !value.includes(item))
  );
  const [inputValue, setInputValue] = React.useState("");
  const disabled = data.length === 0;

  const handleUnselect = React.useCallback(
    (item: ItemType) => {
      const newSelected = selected.filter((i) => i.code !== item.code);
      setSelected(newSelected);
      setSelectable((prev) => [...prev, item]);
      onChange(newSelected);
    },
    [onChange, selected]
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
    [onChange, selected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
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
    [onChange, value]
  );

  React.useEffect(() => {
    setSelectable(data.filter((item) => !selected.includes(item)));
    if (selected.length === 2) {
      setInputValue("");
      setOpen(false);
    }
  }, [value, data, selected]);

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
              disabled={disabled || value.length === 2}
              placeholder={placeholder}
              className={cn(
                "ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1",
                disabled && "cursor-not-allowed"
              )}
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectable.length > 0 ? (
            <div className="bg-zinc-50 dark:bg-zinc-950 absolute w-full top-0 rounded-md border dark:border-zinc-700 bg-popover text-popover-foreground shadow-md outline-none animate-in">
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
      </Command>{" "}
    </div>
  );
};

export default MultiSelect;
