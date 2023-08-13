import React from "react";
import { Table } from "lucide-react";
import Link from "next/link";

const LogoTitle = () => {
  return (
    <Link href={"/"} className="cursor-pointer flex gap-2 items-center">
      <Table className="h-8 w-8 p-1.5" />
      <p className="font-bold">TimeCraft</p>
    </Link>
  );
};

export default LogoTitle;
