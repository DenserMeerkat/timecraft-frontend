import { request } from "./constants";
import { TimeTableRequest, TimeTableResponse } from "./types";

export async function craftTimetable(
  timetableRequest: TimeTableRequest,
  updateResponse: (response: TimeTableResponse) => void,
) {
  const localhostURL = `${request.localhostURL}:${request.port}${request.endpoint}`;
  const deploymentURL = `${request.deploymentURL}${request.endpoint}`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timetableRequest),
  };
  console.log("Request:", timetableRequest);
  try {
    const response = await fetch(deploymentURL, requestOptions);
    const data = await response.json();
    console.log("Response:", data);
    updateResponse(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
