import {
  Course,
  Faculty,
  JointCourse,
  TimeTableRequest,
  Event,
  FacultyTimeTable,
} from "./types";

export function generateFacultyTimeTables(
  events: Event[],
  timetable: number[][],
  studentGroups: string[],
): FacultyTimeTable[] {
  console.log("Generating faculty timetables");
  let facultyTimeTables: FacultyTimeTable[] = [];
  events.forEach((event, eventIndex) => {
    event.classes.forEach((course, courseIndex) => {
      course.faculties.forEach((faculty, facultyIndex) => {
        let indices: number[] = [];
        timetable[studentGroups.indexOf(event.studentGroup)].forEach(
          (slot, slotIndex) => {
            if (slot === eventIndex) {
              indices.push(slotIndex);
            }
          },
        );
        if (
          facultyTimeTables.find((f) => f.facultyCode === faculty.code) ==
          undefined
        ) {
          facultyTimeTables.push({
            facultyCode: faculty.code,
            classes: [
              {
                timetable: indices,
                courseCode: course.courseCode,
                studentGroup: event.studentGroup,
              },
            ],
          });
        } else {
          let facultyIndex = facultyTimeTables.findIndex(
            (f) => f.facultyCode === faculty.code,
          );
          const repeatCourse: any = facultyTimeTables[
            facultyIndex
          ].classes.find((c) => c.courseCode === course.courseCode);
          if (repeatCourse == undefined) {
            facultyTimeTables[facultyIndex].classes.push({
              timetable: indices,
              courseCode: course.courseCode,
              studentGroup: event.studentGroup,
            });
          } else {
            const ind = facultyTimeTables[facultyIndex].classes.findIndex(
              (c) => c.courseCode === course.courseCode,
            );
            facultyTimeTables[facultyIndex].classes[ind].timetable.push(
              ...indices,
            );
          }
        }
      });
    });
  });
  return facultyTimeTables;
}

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
