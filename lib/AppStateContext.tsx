import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Faculty, Course, Subject } from "./types";

interface AppContextType {
  hours: number | null;
  days: number | null;
  lock: boolean;
  faculties: Faculty[];
  courses: Course[];
  subjects: Subject[];
  groups: string[];
  updateHours: (hours: number) => void;
  updateDays: (days: number) => void;
  updateLock: () => void;
  updateFaculties: (faculties: Faculty[]) => void;
  updateCourses: (courses: Course[]) => void;
  updateSubjects: (subjects: Subject[]) => void;
  updateGroups: (groups: string[]) => void;
}

const defaultAppContext: AppContextType = {
  hours: null,
  days: null,
  lock: false,
  faculties: [],
  courses: [],
  subjects: [],
  groups: [],
  updateHours: () => {},
  updateDays: () => {},
  updateLock: () => {},
  updateFaculties: () => {},
  updateCourses: () => {},
  updateSubjects: () => {},
  updateGroups: () => {},
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
  const [subjects, setSubjects] = useState([] as Subject[]);
  const [groups, setGroups] = useState([] as string[]);
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
  const updateSubjects = (subjects: Subject[]) => {
    setSubjects(subjects);
  };
  const updateGroups = (groups: string[]) => {
    setGroups(groups);
  };
  const state: AppContextType = {
    hours,
    days,
    lock,
    faculties,
    courses,
    subjects,
    groups,
    updateLock,
    updateHours,
    updateDays,
    updateCourses,
    updateFaculties,
    updateSubjects,
    updateGroups,
  };

  useEffect(() => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setHours(parsedState.hours);
      setDays(parsedState.days);
      setLock(parsedState.lock);
      setFaculties(parsedState.faculties);
      setCourses(parsedState.courses);
      setSubjects(parsedState.subjects);
      setGroups(parsedState.groups);
    }
  }, []);

  useEffect(() => {
    const stateToStore = JSON.stringify({
      hours,
      days,
      lock,
      faculties,
      courses,
      subjects,
      groups,
    });
    localStorage.setItem("appState", stateToStore);
  }, [hours, days, lock, faculties, courses, subjects, groups]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
