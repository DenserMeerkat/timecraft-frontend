import { request } from "./constants";
import { TimeTableRequest } from "./types";

export async function generateTimetable(timetableRequest: TimeTableRequest) {
  const url = `${request.localhostURL}:${request.port}${request.endpoint}`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timetableRequest),
  };
  console.log("Request:", timetableRequest);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
