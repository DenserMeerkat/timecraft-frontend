"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TimeTableRequest } from "@/lib/types";
import { craftTimetable } from "@/lib/request";
import { generateTimetableRequestType } from "@/lib/functions";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

const GenerateButton = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGeneratePopover, setShowGeneratePopover] = useState(false);
  const {
    lock,
    days,
    hours,
    groups,
    faculties,
    courses,
    jointCourses,
    updateResponse,
    isDevMode,
  } = useAppContext();

  const handleGenerateClick = async () => {
    setShowGeneratePopover(false);
    setIsLoading(true);
    const timetableRequest: TimeTableRequest = generateTimetableRequestType(
      hours!,
      days!,
      groups,
      faculties,
      courses,
      jointCourses,
    );
    await craftTimetable(timetableRequest, updateResponse, isDevMode);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsDomLoaded(true);

    const handleSampleLoaded = () => {
      setTimeout(() => {
        setShowGeneratePopover(true);
      }, 500);
    };

    window.addEventListener("sample-data-loaded", handleSampleLoaded);
    return () => {
      window.removeEventListener("sample-data-loaded", handleSampleLoaded);
    };
  }, []);

  const handleDismissPopover = () => {
    setShowGeneratePopover(false);
  };

  if (!isDomLoaded)
    return (
      <div id="generate-section" className="mx-auto w-fit">
        <Button size={"lg"} disabled={true}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </div>
    );

  return (
    <div id="generate-section" className="mx-auto flex flex-col items-center">
      <Popover
        modal={false}
        open={showGeneratePopover}
        onOpenChange={setShowGeneratePopover}
      >
        <PopoverAnchor asChild>
          <div className="w-fit">
            <Button
              size={"lg"}
              disabled={
                isLoading ||
                !lock ||
                courses?.length == 0 ||
                faculties?.length == 0
              }
              onClick={handleGenerateClick}
            >
              {!isLoading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              ) : (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              )}
            </Button>
          </div>
        </PopoverAnchor>
        <PopoverContent
          side="top"
          align="center"
          sideOffset={14}
          className="w-72 max-w-sm p-3.5 shadow-lg"
        >
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                <h4 className="text-sm font-semibold leading-none">
                  Ready to Generate
                </h4>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Click Generate to create conflict-free schedules.
              </p>
            </div>
            <div className="flex justify-end pt-0.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDismissPopover}
              >
                Got it
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GenerateButton;
