"use client";
import { ThemeProvider } from "next-themes";
import { AppContextProvider } from "@/components/context/AppStateContext";
import Header from "@/components/Header/Header";

export default function RootComponet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <ThemeProvider enableSystem attribute="class">
        <Header />
        {children}
      </ThemeProvider>
    </AppContextProvider>
  );
}
