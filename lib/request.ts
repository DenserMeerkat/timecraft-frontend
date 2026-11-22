import { request } from "./constants";
import { TimeTableRequest, TimeTableResponse } from "./types";

export type ServerHealth = "ready" | "warming" | "offline";

export async function pingBackend(isDevMode: boolean): Promise<ServerHealth> {
  const localhostURL = `${request.localhostURL}:${request.port}`;
  const deploymentURL = request.deploymentURL;
  const baseUrl = isDevMode ? localhostURL : deploymentURL;
  const url = `${baseUrl}${request.endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return "ready";
  } catch (error) {
    return "warming";
  }
}

export async function craftTimetable(
  timetableRequest: TimeTableRequest,
  updateResponse: (response: TimeTableResponse) => void,
  isDevMode: boolean,
) {
  const localhostURL = `${request.localhostURL}:${request.port}${request.endpoint}`;
  const deploymentURL = `${request.deploymentURL}${request.endpoint}`;
  const url = isDevMode ? localhostURL : deploymentURL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timetableRequest),
  };
  console.log("URL:", url);
  console.log("Request:", timetableRequest);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log("Response:", data);
    updateResponse(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
