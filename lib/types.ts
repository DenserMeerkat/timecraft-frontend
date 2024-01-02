import * as z from "zod";
import { assignmentSchema, courseSchema, facultySchema } from "./schemas";

export enum CourseType {
  CORE = "Core",
  ELECTIVE = "Elective",
  SHARED = "Shared",
}

export type Course = z.infer<typeof courseSchema>;

export type Faculty = z.infer<typeof facultySchema>;

export type Assignment = z.infer<typeof assignmentSchema>;

export type Schedule = {
  id: string;
  periods: number[];
};
