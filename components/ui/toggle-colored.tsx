"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-zinc-900 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:data-[state=on]:text-zinc-50 ",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-zinc-200 bg-transparent hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
      color: {
        zinc: "data-[state=on]:bg-zinc-100 dark:hover:bg-zinc-800 dark:data-[state=on]:bg-zinc-800 ",

        rose: "hover:bg-rose-100 data-[state=on]:bg-rose-200 dark:hover:bg-rose-400/20 dark:data-[state=on]:bg-rose-400/40",

        sky: "hover:bg-sky-100 data-[state=on]:bg-sky-200 dark:hover:bg-sky-400/20 dark:data-[state=on]:bg-sky-400/40",

        emerald:
          "hover:bg-emerald-100 data-[state=on]:bg-emerald-200 dark:hover:bg-emerald-400/20 dark:data-[state=on]:bg-emerald-400/40",

        blue: "hover:bg-blue-100 data-[state=on]:bg-blue-200 dark:hover:bg-blue-400/20 dark:data-[state=on]:bg-blue-400/40",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "zinc",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, color, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, color, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
