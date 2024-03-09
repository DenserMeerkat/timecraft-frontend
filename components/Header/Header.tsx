import React from "react";
import LogoTitle from "./elements/LogoTitle";
import Tray from "./Tray";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-zinc-300 bg-zinc-50/[0.5]
    backdrop-blur-lg  backdrop-filter dark:border-zinc-800 dark:bg-zinc-950/[0.7]"
    >
      <div className="mx-auto px-1 py-2 sm:px-2 md:px-6">
        <div className="flex w-full items-center justify-between">
          <LogoTitle />
          <Tray />
        </div>
      </div>
    </header>
  );
};

export default Header;
