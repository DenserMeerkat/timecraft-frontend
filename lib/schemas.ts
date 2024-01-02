import * as z from "zod";
import { CourseType } from "./types";

export const facultySchema = z.object({
  code: z.string(),
  name: z.string(),
  occupiedHours: z.array(z.number()),
});

export const courseSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const assignmentSchema = z.object({
  courseType: z.nativeEnum(CourseType),
  faculties: z.array(facultySchema),
  courses: z.array(courseSchema),
  ratio: z.array(z.number()).optional(),
  studentGroup: z.string(),
  hours: z.number(),
  weightedHours: z.array(z.number()).optional(),
});
