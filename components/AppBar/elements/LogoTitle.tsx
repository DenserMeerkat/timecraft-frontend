import React from "react";
import { CalendarRange } from "lucide-react";
import Link from "next/link";

const LogoTitle = () => {
  return (
    <Link href={"/"} className="flex cursor-pointer items-center gap-2">
      <CalendarRange className="h-8 w-8 p-1.5" />
      <p className="font-bold">TimeCraft</p>
    </Link>
  );
};

export default LogoTitle;
