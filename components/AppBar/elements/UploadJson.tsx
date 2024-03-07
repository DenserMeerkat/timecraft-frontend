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
import { Upload } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";

const UploadJson = () => {
  const state = useAppContext();

  function handleClick() {}
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} asChild>
          <div className="flex w-full cursor-pointer items-center">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Warning</AlertDialogTitle>
          <AlertDialogDescription>
            Uploading data with JSON resets current data.
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
              Reset & Upload
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UploadJson;
