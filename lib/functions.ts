import { Course, Faculty, JointCourse, TimeTableRequest } from "./types";

export function filterNullJointCourses(jointCourses: JointCourse[]) {
  return jointCourses.filter(
    (jointCourse) =>
      (jointCourse.fixedSlots != undefined &&
        jointCourse.fixedSlots?.length > 0) ||
      jointCourse.courses.length > 1,
  );
}

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

export function generateTimetableRequestType(
  hours: number,
  days: number,
  studentGroups: string[],
  faculties: Faculty[],
  courses: Course[],
  jointCourses: JointCourse[],
) {
  let convertedJointCourses: JointCourse[] = [];
  const availableCourses = getAvailableCourses(courses, jointCourses);
  convertedJointCourses = courseListToJointCourseList(availableCourses);
  const allJointCourses = [...jointCourses, ...convertedJointCourses];

  const timetableRequest: TimeTableRequest = {
    noHours: hours,
    noDays: days,
    studentGroups: studentGroups,
    faculties: faculties,
    courses: courses,
    jointCoursesList: allJointCourses,
  };
  return timetableRequest;
}
