"use client";

import { useEffect, useState } from "react";
import { getSchedules , createSchedule } from "../services/calendar.api";
import { CalendarLayout } from "@repo/ui";

const Page = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] =
    useState<"today" | "week" | "month">("today");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSchedules();
        console.log("Fetched schedules:", data);
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchData(); 
  }, []); 
  const handleCreateSchedule = async (payload: CreateSchedulePayload) => {
  try {
    await createSchedule(payload);

    const updated = await getSchedules();
    setSchedules(updated);
  } catch (error) {
    console.error("Error creating schedule:", error);
  }
};

  return (
    <div style={{ height: "100vh" }}>
      <CalendarLayout
        activeView={activeView}
        onViewChange={setActiveView}
        currentDate={currentDate}
        schedules={schedules}   
        onCreateSchedule={handleCreateSchedule}
      />
    </div>
  );
};

export default Page;
