import React from "react";
import ThemeSwitcher from "./elements/ThemeSwitcher";
import GitHubLink from "./elements/Github";
import Menu from "./elements/Menu";
import SampleButton from "./elements/Sample";

const Tray = () => {
  return (
    <div
      className={
        "flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-1.5 lg:gap-2"
      }
    >
      <SampleButton />
      <ThemeSwitcher />
      <GitHubLink />
      <Menu />
    </div>
  );
};

export default Tray;
