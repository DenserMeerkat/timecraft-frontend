"use client";
import { ThemeProvider } from "next-themes";
import AppBar from "@/components/AppBar/AppBar";

export default function RootComponet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider enableSystem attribute="class">
      <AppBar />
      {children}
    </ThemeProvider>
  );
}
