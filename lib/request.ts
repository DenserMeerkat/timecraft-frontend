import { request } from "./constants";
import { Course, Faculty, JointCourse, TimeTableRequest } from "./types";
import { getAvailableCourses, courseListToJointCourseList } from "./functions";

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

export async function generateTimetable(timetableRequest: TimeTableRequest) {
  const url = `${request.localhostURL}:${request.port}${request.endpoint}`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timetableRequest),
  };
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
