import React from "react";
import ThemeSwitcher from "./elements/ThemeSwitcher";
import GitHubLink from "./elements/Github";
import ResetButton from "./elements/Reset";

const Tray = () => {
  return (
    <div
      className={
        "flex gap-0.5 min-[400px]:gap-1 sm:gap-1.5 lg:gap-2 items-center"
      }
    >
      <ResetButton />
      <GitHubLink />
      <ThemeSwitcher />
    </div>
  );
};

export default Tray;
