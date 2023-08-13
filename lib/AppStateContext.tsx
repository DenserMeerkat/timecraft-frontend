import React, { createContext, useContext, useState, ReactNode } from "react";
import { Faculty, Course } from "./types";

interface AppContextType {
  hours: number;
  days: number;
  lock: boolean;
  faculties: Faculty[];
  courses: Course[];
  updateHours: (hours: number) => void;
  updateDays: (days: number) => void;
  updateLock: () => void;
  updateFaculties: (faculties: Faculty[]) => void;
  updateCourses: (courses: Course[]) => void;
}

const defaultAppContext: AppContextType = {
  hours: 0,
  days: 0,
  lock: false,
  faculties: [],
  courses: [],
  updateHours: () => {},
  updateDays: () => {},
  updateLock: () => {},
  updateFaculties: () => {},
  updateCourses: () => {},
};
const AppContext = createContext<AppContextType>(defaultAppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [lock, setLock] = useState(false);
  const [faculties, setFaculties] = useState([] as Faculty[]);
  const [courses, setCourses] = useState([] as Course[]);
  const updateHours = (hours: number) => {
    setHours(hours);
  };
  const updateDays = (days: number) => {
    setDays(days);
  };
  const updateLock = () => {
    setLock((prev) => !prev);
  };
  const updateFaculties = (faculties: Faculty[]) => {
    setFaculties(faculties);
  };
  const updateCourses = (courses: Course[]) => {
    setCourses(courses);
  };
  const state: AppContextType = {
    hours,
    days,
    lock,
    faculties,
    courses,
    updateLock,
    updateHours,
    updateDays,
    updateCourses,
    updateFaculties,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
