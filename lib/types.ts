import * as z from "zod";
import { courseSchema, facultySchema, joinCoursesSchema } from "./schemas";

export type Course = z.infer<typeof courseSchema>;

export type Faculty = z.infer<typeof facultySchema>;

export type JointCourse = z.infer<typeof joinCoursesSchema>;

export type Schedule = {
  id: string;
  periods: number[];
};

export type ItemType = { code: string; name?: string };

export type TimeTableRequest = {
  noHours: number;
  noDays: number;
  studentGroups: string[];
  faculties: Faculty[];
  courses: Course[];
  jointCoursesList: JointCourse[];
};
