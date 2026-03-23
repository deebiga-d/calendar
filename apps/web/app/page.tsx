"use client";

import { useEffect, useState } from "react";
import {
  getSchedules,
  createSchedule,
  type CreateSchedulePayload as ApiCreateSchedulePayload,
} from "../services/calendar.api";
import {
  CalendarLayout,
  CalendarTheme,
  type CreateSchedulePayload,
} from "@repo/ui";

const Page = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
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
      await createSchedule(payload as unknown as ApiCreateSchedulePayload);

      const updated = await getSchedules();
      setSchedules(updated);
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  const accent =
    typeof process.env.NEXT_PUBLIC_CALENDAR_ACCENT === "string"
      ? process.env.NEXT_PUBLIC_CALENDAR_ACCENT
      : undefined;

  return (
    <div style={{ height: "100vh" }}>
      <CalendarTheme accentColor={accent}>
        <CalendarLayout
          activeView={activeView}
          onViewChange={setActiveView}
          schedules={schedules}
          onCreateSchedule={handleCreateSchedule}
        />
      </CalendarTheme>
    </div>
  );
};

export default Page;
