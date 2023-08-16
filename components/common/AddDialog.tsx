"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAppContext } from "@/lib/AppStateContext";

const AddDialog = (props: any) => {
  const [open, setOpen] = useState(false);
  const itemName = props.itemName;
  const Content = props.Content;
  const state = useAppContext();
  const { lock } = state;
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={!lock}>
        <Button className="" size={"sm"}>
          <p>
            Add
            <span className="hidden sm:inline"> </span>
            <span className="hidden sm:inline">{itemName}</span>
          </p>
        </Button>
      </AlertDialogTrigger>
      <Content open={open} setOpen={setOpen} />
    </AlertDialog>
  );
};

export default AddDialog;
