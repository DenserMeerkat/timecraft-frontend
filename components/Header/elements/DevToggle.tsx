"use client";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/components/context/AppStateContext";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const DevToggle = () => {
  const state = useAppContext();
  const { isDevMode, updateIsDevMode } = state;

  const toggleDevMode = (val: boolean) => {
    updateIsDevMode();
  };

  return (
    <div className="flex items-center px-1">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild className="mr-2">
            <Info className="h-4 w-4 opacity-60" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable this to use the localhost URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Label htmlFor="is-dev-mode" className="mr-auto ">
        Dev Mode
      </Label>
      <Switch
        id="is-dev-mode"
        checked={isDevMode}
        onCheckedChange={toggleDevMode}
      />
    </div>
  );
};

export default DevToggle;
