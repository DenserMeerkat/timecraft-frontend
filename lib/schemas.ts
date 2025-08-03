import * as z from "zod";

export const facultySchema = z.object({
  code: z.string(),
  name: z.string().optional().nullable(),
  occupiedSlots: z.array(z.number()).optional().nullable(),
});

export const courseSchema = z.object({
  code: z.string(),
  name: z.string().optional().nullable(),
  faculties: z.array(facultySchema),
  isShared: z.boolean().default(false).optional().nullable(),
  noHours: z.number(),
  hoursDistribution: z.array(z.number()).optional().nullable(),
  studentGroup: z.string(),
});

export const joinCoursesSchema = z.object({
  courses: z.array(courseSchema),
  fixedSlots: z.array(z.number()).optional().nullable(),
});
