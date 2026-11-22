"use client";
import React, { useState, useEffect } from "react";
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
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BookOpenCheckIcon, Sparkles } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import TooltipElement from "@/components/common/TooltipElement";
import sampleData from "@/public/sample.json";
import { TimeTableRequest } from "@/lib/types";

const SampleButton = () => {
  const state = useAppContext();
  const [showPopover, setShowPopover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasContextData =
      (state.courses && state.courses.length > 0) ||
      (state.faculties && state.faculties.length > 0) ||
      (state.response &&
        state.response.timetable &&
        state.response.timetable.length > 0);

    let hasLocalData = false;
    try {
      const stored = localStorage.getItem("appState");
      if (stored) {
        const parsed = JSON.parse(stored);
        hasLocalData =
          (parsed.courses && parsed.courses.length > 0) ||
          (parsed.faculties && parsed.faculties.length > 0) ||
          (parsed.response &&
            parsed.response.timetable &&
            parsed.response.timetable.length > 0);
      }
    } catch (e) {}

    const hasAnyData = hasContextData || hasLocalData;

    if (!hasAnyData) {
      setShowPopover(true);
    } else {
      setShowPopover(false);
    }
  }, [state.courses, state.faculties, state.response]);

  const handleLoadSample = () => {
    try {
      const timetableRequest: TimeTableRequest = sampleData;
      state.upload(timetableRequest);
      setShowPopover(false);

      toast({
        title: "Sample data loaded",
        description: <p>Demo data is ready.</p>,
      });

      setTimeout(() => {
        const generateSection = document.getElementById("generate-section");
        generateSection?.scrollIntoView({ behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("sample-data-loaded"));
      }, 350);
    } catch (error) {
      toast({
        title: "Load failed",
      });
    }
  };

  const handleDismiss = () => {
    setShowPopover(false);
  };

  if (!mounted) {
    return (
      <Button size="icon" variant="ghost">
        <BookOpenCheckIcon className="p-0.5" />
      </Button>
    );
  }

  return (
    <Popover modal={false} open={showPopover} onOpenChange={setShowPopover}>
      <PopoverAnchor asChild>
        <div className="relative inline-flex">
          <AlertDialog>
            <TooltipElement
              element={
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <BookOpenCheckIcon className="p-0.5" />
                  </Button>
                </AlertDialogTrigger>
              }
              tooltip="Load Sample Data"
            />
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
                    variant="destructive"
                    className="w-full px-6"
                    onClick={handleLoadSample}
                  >
                    Load
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={10}
        className="w-72 p-3.5 shadow-lg"
      >
        <div className="space-y-2.5">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
              <h4 className="text-sm font-semibold leading-none">
                Try Sample Data
              </h4>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Load demo courses and faculties to test the timetable generator.
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 pt-0.5">
            <Button variant="secondary" size="sm" onClick={handleDismiss}>
              Dismiss
            </Button>
            <Button variant="default" size="sm" onClick={handleLoadSample}>
              Load Sample
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SampleButton;
