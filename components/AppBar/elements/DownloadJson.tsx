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
import { Download } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";

const DownloadJson = () => {
  const state = useAppContext();

  function handleClick() {}
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} asChild>
          <div className="flex w-full cursor-pointer items-center">
            <Download className="mr-2 h-4 w-4" /> Download
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download</AlertDialogTitle>
          <AlertDialogDescription>
            Download data in JSON format.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent p-0 dark:bg-transparent">
            <Button className="w-full px-6" onClick={handleClick}>
              Download
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DownloadJson;
