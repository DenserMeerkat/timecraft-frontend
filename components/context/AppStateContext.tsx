import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  Faculty,
  Course,
  JointCourse,
  TimeTableRequest,
  TimeTableResponse,
} from "@/lib/types";
import {
  generateTimetableRequestType,
  courseListToJointCourseList,
  filterNullJointCourses,
  getAvailableCourses,
} from "@/lib/functions";
import { set } from "zod";

interface AppContextType {
  hours: number | null;
  days: number | null;
  lock: boolean;
  faculties: Faculty[];
  courses: Course[];
  jointCourses: JointCourse[];
  groups: string[];
  response: TimeTableResponse;
  updateHours: (hours: number | null) => void;
  updateDays: (days: number | null) => void;
  updateLock: () => void;
  updateFaculties: (faculties: Faculty[]) => void;
  updateCourses: (courses: Course[]) => void;
  updateJointCourses: (jointCourses: JointCourse[]) => void;
  updateGroups: (groups: string[]) => void;
  updateResponse: (response: TimeTableResponse) => void;
  reset: () => void;
  upload: (data: TimeTableRequest) => void;
  download: () => TimeTableRequest | null;
}

const defaultAppContext: AppContextType = {
  hours: null,
  days: null,
  lock: false,
  faculties: [],
  courses: [],
  jointCourses: [],
  groups: [],
  response: {
    events: [],
    studentGroups: [],
    timetable: [],
  },
  updateHours: () => {},
  updateDays: () => {},
  updateLock: () => {},
  updateFaculties: () => {},
  updateCourses: () => {},
  updateJointCourses: () => {},
  updateGroups: () => {},
  updateResponse: (response: TimeTableResponse) => {},
  reset: () => {},
  upload: (data: TimeTableRequest) => {},
  download: () => null,
};
const AppContext = createContext<AppContextType>(defaultAppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [hours, setHours] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [lock, setLock] = useState(false);
  const [faculties, setFaculties] = useState([] as Faculty[]);
  const [courses, setCourses] = useState([] as Course[]);
  const [jointCourses, setJointCourses] = useState([] as JointCourse[]);
  const [groups, setGroups] = useState([] as string[]);
  const [response, setResponse] = useState<TimeTableResponse>({
    events: [],
    studentGroups: [],
    timetable: [],
  });

  const updateLock = () => {
    setLock((prev) => !prev);
  };

  const resetState = () => {
    setHours(0);
    setDays(0);
    setLock(false);
    setFaculties([]);
    setCourses([]);
    setJointCourses([]);
    setGroups([]);
    localStorage.removeItem("appState");
  };

  const uploadState = (data: TimeTableRequest) => {
    const filteredJointCourses = filterNullJointCourses(data.jointCoursesList);
    resetState();
    setHours(data.noHours);
    setDays(data.noDays);
    setLock(true);
    setFaculties(data.faculties);
    setCourses(data.courses);
    setJointCourses(filteredJointCourses);
    setGroups(data.studentGroups);
    setResponse({
      events: [],
      studentGroups: [],
      timetable: [],
    });
  };

  const downloadState = () => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      let convertedJointCourses: JointCourse[] = [];
      const availableCourses = getAvailableCourses(
        parsedState.courses,
        parsedState.jointCourses,
      );
      convertedJointCourses = courseListToJointCourseList(availableCourses);
      const allJointCourses = [
        ...parsedState.jointCourses,
        ...convertedJointCourses,
      ];
      return generateTimetableRequestType(
        parsedState.hours,
        parsedState.days,
        parsedState.groups,
        parsedState.faculties,
        parsedState.courses,
        allJointCourses,
      );
    }
    return null;
  };

  const state: AppContextType = {
    hours,
    days,
    lock,
    faculties,
    courses,
    jointCourses,
    groups,
    response,
    updateLock,
    updateHours: setHours,
    updateDays: setDays,
    updateCourses: setCourses,
    updateFaculties: setFaculties,
    updateJointCourses: setJointCourses,
    updateGroups: setGroups,
    updateResponse: setResponse,
    reset: resetState,
    upload: uploadState,
    download: downloadState,
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
      setJointCourses(parsedState.jointCourses);
      setGroups(parsedState.groups);
      setResponse(parsedState.response);
    }
  }, []);

  useEffect(() => {
    const stateToStore = JSON.stringify({
      hours,
      days,
      lock,
      faculties,
      courses,
      jointCourses,
      groups,
      response,
    });
    localStorage.setItem("appState", stateToStore);
  }, [hours, days, lock, faculties, courses, jointCourses, groups, response]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
