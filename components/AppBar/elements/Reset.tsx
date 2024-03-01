"use client";
import React from "react";
import TooltipElement from "@/components/common/TooltipElement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";

const ResetButton = () => {
  const state = useAppContext();

  function handleClick() {
    state.reset();
  }
  return (
    <AlertDialog>
      <TooltipElement
        element={
          <AlertDialogTrigger asChild>
            <Button size="icon" variant={"ghost"} asChild>
              <RotateCcw className={"p-2"} />
            </Button>
          </AlertDialogTrigger>
        }
        tooltip={"Reset"}
      ></TooltipElement>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all
            current data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent p-0 dark:bg-transparent">
            <Button
              variant={"destructive"}
              className="w-full px-6"
              onClick={handleClick}
            >
              Reset
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ResetButton;
