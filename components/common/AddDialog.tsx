"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const AddDialog = (props: any) => {
  const itemName = props.itemName;
  const content = props.content;
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mr-1 sm:mr-4 md:mr-5" size={"sm"}>
          <p>
            Add
            <span className="hidden sm:inline"> </span>
            <span className="hidden sm:inline">{itemName}</span>
          </p>
        </Button>
      </DialogTrigger>
      {content}
    </Dialog>
  );
};

export default AddDialog;
