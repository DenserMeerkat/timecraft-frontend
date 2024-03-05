import { Course, Faculty, JointCourse } from "./types";

export function getAvailableCourses(
  courses: Course[],
  jointCourses: JointCourse[],
) {
  if (jointCourses.length > 0) {
    let availableCourses: Course[] = [];
    courses.forEach((course) => {
      if (
        jointCourses.every(
          (jointCourse) =>
            !jointCourse.courses.find((c: Course) => c.code === course.code),
        )
      ) {
        availableCourses.push(course);
      }
    });
    return availableCourses;
  } else {
    return courses;
  }
}

export function getAvailableFaculties(faculties: Faculty[], courses: Course[]) {
  let availableFaculties: Faculty[] = [];
  faculties.forEach((faculty) => {
    let isAvailable = true;
    courses.forEach((course) => {
      if (course.faculties.find((f) => f.code === faculty.code)) {
        isAvailable = false;
      }
    });
    if (isAvailable) {
      availableFaculties.push(faculty);
    }
  });
  return availableFaculties;
}

export function getOccupiedSlots(course: Course) {
  let occupiedSlots: number[] = [];
  course.faculties.forEach((faculty) => {
    occupiedSlots.push(...(faculty.occupiedSlots || []));
  });
  return Array.from(new Set(occupiedSlots));
}

export function resolveHour(hour: number, hours: number) {
  let res: string = "";
  const day = Math.floor(hour / hours);
  const hourWithinDay = (hour % hours) + 1;
  res = String.fromCharCode(65 + day);
  res += hourWithinDay;
  return res;
}

export function courseListToJointCourseList(courses: Course[]): JointCourse[] {
  return courses.map((course) => courseToJointCourse(course));
}

export function courseToJointCourse(course: Course): JointCourse {
  return {
    courses: [course],
    fixedSlots: [],
  } as JointCourse;
}
