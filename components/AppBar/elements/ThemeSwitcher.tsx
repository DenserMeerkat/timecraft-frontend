"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, RotateCw } from "lucide-react";
import TooltipElement from "../../common/TooltipElement";
import { Button } from "@/components/ui/button";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const renderThemeChanger = () => {
    if (!mounted)
      return (
        <TooltipElement
          element={
            <Button size="icon" variant={"ghost"}>
              <RotateCw className={"p-0.5"} />
            </Button>
          }
          tooltip={"Loading..."}
        />
      );
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <TooltipElement
          element={
            <Button
              size="icon"
              variant={"ghost"}
              onClick={() => setTheme("light")}
            >
              <Sun className={"p-0.5"} />
            </Button>
          }
          tooltip={"Light mode"}
        />
      );
    } else {
      return (
        <TooltipElement
          element={
            <Button
              size="icon"
              variant={"ghost"}
              onClick={() => setTheme("dark")}
            >
              <Moon className={"p-0.5"} />
            </Button>
          }
          tooltip={"Dark mode"}
        />
      );
    }
  };
  return <div>{renderThemeChanger()}</div>;
};

export default ThemeSwitcher;
