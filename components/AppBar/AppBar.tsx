import React from "react";
import LogoTitle from "./elements/LogoTitle";
import Tray from "./Tray";

const AppBar = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-zinc-300 dark:border-zinc-700
    bg-zinc-50/[0.5]  dark:bg-zinc-950/[0.7] backdrop-filter backdrop-blur-lg"
    >
      <div className="mx-auto py-2 px-1 sm:px-2 md:px-6">
        <div className="w-full flex items-center justify-between">
          <LogoTitle />
          <Tray />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
