import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", 
});

export type CreateSchedulePayload = {
  title: string;
  date: string; 
  place?: string;
  notes?: string;

  schedule?: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
    summary: string;
  } | null;
};


export type Schedule = {
  id: string;
  title: string;
  date: string;
  place?: string;
  notes?: string;

  schedule?: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
    summary: string;
  } | null;
};


// Get all schedules
export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await api.get("/schedules");
  console.log("API getSchedules response:", response.data);
  return response.data;
};

// Create a new schedule
export const createSchedule = async (payload: CreateSchedulePayload): Promise<Schedule> => {
  const response = await api.post("/schedules", payload);
  console.log("API createSchedule response:", response.data);
  return response.data;
};
