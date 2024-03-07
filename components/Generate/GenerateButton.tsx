"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TimeTableRequest } from "@/lib/types";
import { generateTimetable } from "@/lib/request";
import { generateTimetableRequestType } from "@/lib/functions";

const GenerateButton = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { lock, days, hours, groups, faculties, courses, jointCourses } =
    useAppContext();

  const handleGenerateClick = async () => {
    setIsLoading(true);
    const timetableRequest: TimeTableRequest = generateTimetableRequestType(
      hours!,
      days!,
      groups,
      faculties,
      courses,
      jointCourses,
    );
    await generateTimetable(timetableRequest);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);

  if (!isDomLoaded)
    return (
      <Button size={"lg"} disabled={true}>
        <Sparkles className="mr-2 h-4 w-4" />
        <span className="font-lg font-bold">Generate</span>
      </Button>
    );

  return (
    <div className="mx-auto w-fit">
      <Button
        size={"lg"}
        disabled={
          isLoading || !lock || courses?.length == 0 || faculties?.length == 0
        }
        onClick={handleGenerateClick}
      >
        {!isLoading ? (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="font-lg font-bold">Generate</span>
          </>
        ) : (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Generating
          </>
        )}
      </Button>
    </div>
  );
};

export default GenerateButton;
