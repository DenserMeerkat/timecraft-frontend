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
import { BookOpenCheckIcon } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import sampleData from "@/public/sample.json";
import { TimeTableRequest } from "@/lib/types";

const SampleButton = () => {
  const state = useAppContext();

  function handleClick() {
    try {
      const timetableRequest: TimeTableRequest = sampleData;
      state.upload(timetableRequest);
      toast({
        title: "Load successfull",
        description: <p>Loaded Sample data.</p>,
      });
    } catch (error) {
      toast({
        title: "Reset failed",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant={"ghost"}>
          <BookOpenCheckIcon className={"p-0.5"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Load Sample Data?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
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
              Load
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SampleButton;
