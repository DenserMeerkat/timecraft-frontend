"use client";
import React, { useEffect, useState } from "react";
import { pingBackend, ServerHealth } from "@/lib/request";
import { useAppContext } from "@/components/context/AppStateContext";
import TooltipElement from "@/components/common/TooltipElement";
import { Badge } from "@/components/ui/badge";

const ServerStatus = () => {
  const { isDevMode } = useAppContext();
  const [status, setStatus] = useState<ServerHealth>("warming");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isCancelled = false;

    const checkStatus = async () => {
      const result = await pingBackend(isDevMode);
      if (!isCancelled) {
        setStatus(result);
      }
    };

    checkStatus();

    const interval = setInterval(() => {
      checkStatus();
    }, 15000);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [isDevMode]);

  if (!mounted) return null;

  const getStatusDetails = () => {
    if (isDevMode) {
      return {
        label: "Local",
        dotClass: "bg-blue-500",
        tooltip: "Dev Mode: local backend (port 5000)",
      };
    }
    switch (status) {
      case "ready":
        return {
          label: "Ready",
          dotClass: "bg-emerald-500",
          tooltip: "Backend is online and ready.",
        };
      case "warming":
        return {
          label: "Connecting",
          dotClass: "bg-amber-500 animate-pulse",
          tooltip: "Checking backend in background.",
        };
      default:
        return {
          label: "Offline",
          dotClass: "bg-zinc-400",
          tooltip: "Backend offline.",
        };
    }
  };

  const details = getStatusDetails();

  return (
    <TooltipElement
      element={
        <div className="flex cursor-default items-center">
          <Badge
            variant="secondary"
            className="h-7 gap-1.5 rounded-full border-0 px-2.5 text-[0.7rem] font-normal tracking-wide"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${details.dotClass}`} />
            <span className="hidden text-zinc-600 dark:text-zinc-400 sm:inline">
              {details.label}
            </span>
          </Badge>
        </div>
      }
      tooltip={details.tooltip}
    />
  );
};

export default ServerStatus;
