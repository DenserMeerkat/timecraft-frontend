"use client";
import * as React from "react";
import { X, PlusCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

export interface AutoCompleteProps {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: string[];
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  updateData: (newData: string[]) => void;
}

export const AutoComplete = React.forwardRef(
  (
    {
      label,
      placeholder,
      parentClassName,
      data,
      value,
      onChange,
      updateData,
    }: AutoCompleteProps,
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(value);
    const [selectable, setSelectable] = React.useState(
      value ? data.filter((item) => item !== value) : data,
    );
    const [inputValue, setInputValue] = React.useState("");
    const disabled = false;

    const handleUnselect = React.useCallback(
      (item: string) => {
        setSelected(null);
        setSelectable((prev) => [...prev, item]);
        onChange("");
      },
      [onChange],
    );

    const handleAdd = React.useCallback(
      (item: string) => {
        if (data.includes(item) || selectable.includes(item)) return;
        updateData([...data, item]);
        setSelectable((prev) => [...prev, item]);
      },
      [updateData, data, selectable],
    );

    const handleDelete = React.useCallback(
      (item: string) => {
        updateData(data.filter((i) => i != item.toUpperCase()));
        setSelectable((prev) => prev.filter((i) => i != item.toUpperCase()));
        inputRef.current?.blur();
      },
      [updateData, data],
    );

    const handleSelect = React.useCallback(
      (item: string) => {
        setInputValue("");
        setSelected(item.toUpperCase());
        onChange(item.toUpperCase());
        setOpen(false);
      },
      [onChange],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected(null);
              onChange("");
            }
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [onChange],
    );

    React.useEffect(() => {
      let newSelectable;
      if (value) {
        newSelectable = data.filter((item) => item !== value.toUpperCase());
      } else {
        newSelectable = data;
      }
      setSelectable(newSelectable);
      if (selected !== value) {
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
          disabled && "cursor-not-allowed",
        )}
      >
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="border-input group rounded-md border px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1">
              {selected != null && selected !== "" && (
                <Badge key={selected} variant="secondary">
                  {selected}
                  <button
                    type="button"
                    className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(selected);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => {
                      handleUnselect(selected);
                    }}
                  >
                    <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                  </button>
                </Badge>
              )}

              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                disabled={disabled || (selected != null && selected !== "")}
                placeholder={placeholder}
                className={cn(
                  "placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none",
                  disabled && "cursor-not-allowed",
                )}
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open &&
            selectable.some((item: string) => item.includes(inputValue)) ? (
              <div className="bg-popover text-popover-foreground absolute top-0 w-full rounded-lg border bg-zinc-50 shadow-md outline-none animate-in dark:border-zinc-700 dark:bg-zinc-950">
                <CommandGroup className="h-full overflow-auto">
                  {selectable.map((item: string) => {
                    return (
                      <CommandItem
                        key={item}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          handleSelect(item.toUpperCase());
                        }}
                        className={
                          "flex w-full cursor-pointer items-center px-0 py-0 "
                        }
                      >
                        <span className="w-full px-2 py-1.5">
                          {item.toUpperCase()}
                        </span>
                        <button
                          type="button"
                          key={item}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(item);
                          }}
                          className="p-1.5 text-red-500 dark:text-red-500"
                        >
                          <XCircle className="text-muted-foreground h-4 w-4" />
                        </button>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : (
              inputValue.length > 0 && (
                <CommandGroup className="h-full overflow-auto">
                  <CommandItem
                    value={inputValue}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      handleSelect(value);
                      handleAdd(value);
                    }}
                    className={"flex cursor-pointer items-center gap-2"}
                  >
                    <span className="w-full pl-2">
                      {inputValue.toUpperCase()}
                    </span>
                    <div className="p-1">
                      <PlusCircle className="text-muted-foreground h-4 w-4" />
                    </div>
                  </CommandItem>
                </CommandGroup>
              )
            )}
          </div>
        </Command>
      </div>
    );
  },
);

export default AutoComplete;

AutoComplete.displayName = "AutoComplete";
