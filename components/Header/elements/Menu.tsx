"use client";
import React, { useState, useEffect } from "react";
import TooltipElement from "@/components/common/TooltipElement";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Reset from "./Reset";
import Clear from "./Clear";
import UploadJson from "./UploadFile";
import DownloadJson from "./DownloadFile";
import DevToggle from "./DevToggle";

const Menu = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const showDrawer = useMediaQuery({ query: "(max-width: 425px)" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return (
      <Button size="icon" variant={"ghost"} asChild>
        <Settings2 className={"p-2"} />
      </Button>
    );
  }

  if (showDrawer) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant={"ghost"}>
            <Settings2 className={"p-0.5"} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-2 pb-4">
          <div className="mx-auto mt-4 flex w-full max-w-xs flex-col gap-2 text-sm">
            <DevToggle />
            <UploadJson />
            <DownloadJson />
            <Reset />
            <Clear />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <TooltipElement
          element={
            <Button size="icon" variant={"ghost"} asChild>
              <Settings2 className={"p-2"} />
            </Button>
          }
          tooltip={"Actions"}
        ></TooltipElement>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[200px] p-2">
        <div className="flex flex-col gap-2 text-sm">
          <DevToggle />
          <UploadJson />
          <DownloadJson />
          <Reset />
          <Clear />
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Menu;
