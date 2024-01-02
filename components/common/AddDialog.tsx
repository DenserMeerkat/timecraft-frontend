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
        <Button size={"sm"} variant={"secondary"}>
          <p>Add {itemName}</p>
        </Button>
      </AlertDialogTrigger>
      <Content open={open} setOpen={setOpen} />
    </AlertDialog>
  );
};

export default AddDialog;
