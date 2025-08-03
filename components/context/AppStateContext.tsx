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

interface AppContextType {
  hours: number | null;
  days: number | null;
  lock: boolean;
  faculties: Faculty[];
  courses: Course[];
  jointCourses: JointCourse[];
  groups: string[];
  response: TimeTableResponse;
  isDevMode: boolean;
  updateHours: (hours: number | null) => void;
  updateDays: (days: number | null) => void;
  updateLock: () => void;
  updateFaculties: (faculties: Faculty[]) => void;
  updateCourses: (courses: Course[]) => void;
  updateJointCourses: (jointCourses: JointCourse[]) => void;
  updateGroups: (groups: string[]) => void;
  updateResponse: (response: TimeTableResponse) => void;
  clear: () => void;
  upload: (data: TimeTableRequest) => void;
  download: () => TimeTableRequest | null;
  updateIsDevMode: () => void;
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
  isDevMode: false,
  updateHours: () => {},
  updateDays: () => {},
  updateLock: () => {},
  updateFaculties: () => {},
  updateCourses: () => {},
  updateJointCourses: () => {},
  updateGroups: () => {},
  updateResponse: (response: TimeTableResponse) => {},
  clear: () => {},
  upload: (data: TimeTableRequest) => {},
  download: () => null,
  updateIsDevMode: () => {},
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
  const [isDevMode, setIsDevMode] = useState(false);

  const updateLock = () => {
    setLock((prev) => !prev);
  };
  const updateDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  const clearState = () => {
    setHours(0);
    setDays(0);
    setLock(false);
    setFaculties([]);
    setCourses([]);
    setJointCourses([]);
    setGroups([]);
    setResponse({
      events: [],
      studentGroups: [],
      timetable: [],
    });
    localStorage.removeItem("appState");
  };

  const uploadState = (data: TimeTableRequest) => {
    const filteredJointCourses = filterNullJointCourses(data.jointCoursesList);
    clearState();
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
    isDevMode,
    updateLock,
    updateHours: setHours,
    updateDays: setDays,
    updateCourses: setCourses,
    updateFaculties: setFaculties,
    updateJointCourses: setJointCourses,
    updateGroups: setGroups,
    updateResponse: setResponse,
    clear: clearState,
    upload: uploadState,
    download: downloadState,
    updateIsDevMode: updateDevMode,
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
      setIsDevMode(parsedState.isDevMode ?? false);
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
      isDevMode,
    });
    localStorage.setItem("appState", stateToStore);
  }, [
    hours,
    days,
    lock,
    faculties,
    courses,
    jointCourses,
    groups,
    response,
    isDevMode,
  ]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
