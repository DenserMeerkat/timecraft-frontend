"use client";
import React from "react";
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
      <AlertDialogTrigger>
        <Button variant={"destructive"} asChild>
          <div className="flex w-full cursor-pointer">
            <RotateCcw className={"mr-2 h-4 w-4"} />
            Reset
          </div>
        </Button>
      </AlertDialogTrigger>
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
