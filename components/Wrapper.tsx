"use client";
import { ThemeProvider } from "next-themes";
import { AppContextProvider } from "@/lib/AppStateContext";
import AppBar from "@/components/AppBar/AppBar";

export default function RootComponet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <ThemeProvider enableSystem attribute="class">
        <AppBar />
        {children}
      </ThemeProvider>
    </AppContextProvider>
  );
}
