
"use client";
import "./CalendarLayout.css";
import CalendarSidebar from "../CalendarSidebar/CalendarSidebar";
import CalendarSidebarRight from "../CalendarSidebarRight/CalendarSidebarRight";
import { useEffect, useState } from "react";
import dayjs from "dayjs";


import MainCalendar from "../MainCalendar/MainCalendar";        
import CalendarHeader from "../CalendarHeader/CalendarHeader"; 
import type { CreateSchedulePayload } from "../../../src/ScheduleTypes";

type Schedule = {
  id: string;
  title: string;
  place?: string;
  notes?: string;
  startDateTime: string;
  endDateTime: string;
  createdAt?: string;
  updatedAt?: string;
};

type Props = {
  activeView: "today" | "week" | "month";
  onViewChange: (view: "today" | "week" | "month") => void;
  schedules?: Schedule[];
  onCreateSchedule: (payload: CreateSchedulePayload) => void;
 
  showCalendarSidebar?: boolean;

  showCalendarRightSidebar?: boolean;
};

const CalendarLayout = ({
  activeView,
  onViewChange,
  schedules,
  onCreateSchedule,
  showCalendarSidebar = false, 
  showCalendarRightSidebar = true,
}: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userSelectedDate, setUserSelectedDate] = useState<Date | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(showCalendarRightSidebar);

  const allowRightSidebar = showCalendarRightSidebar;

 

  const handlePrev = () => {
    const unit =
      activeView === "month" ? "month" : activeView === "week" ? "week" : "day";

    setCurrentDate(dayjs(currentDate).subtract(1, unit).toDate());
  };

 const handleNext = () => {
  const unit =
    activeView === "month"
      ? "month"
      : activeView === "week"
      ? "week"
      : "day";

    setCurrentDate(dayjs(currentDate).add(1, unit).toDate());
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    setUserSelectedDate(date);
  };

  const handleToggleRightSidebar = () => {
    if (allowRightSidebar) {
      setRightPanelOpen((prev) => !prev);
    }
  };

  return (
    <div className="calendar-layout">
      <div className="calendar-layout-header">
        <CalendarHeader
          activeView={activeView}
          onViewChange={onViewChange}
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onDateChange={handleDateChange}
          onCreateSchedule={onCreateSchedule}
          onToggleSidebar={handleToggleRightSidebar}
        />
      </div>
      <div className="calendar-layout-body">
        {showCalendarSidebar ? <CalendarSidebar /> : null}
        <div className="calendar-layout-main">
          <MainCalendar
            activeView={activeView}
            currentDate={currentDate}
            userSelectedDate={userSelectedDate}
            schedules={schedules ?? []}
          />
        </div>
        {allowRightSidebar && rightPanelOpen ? <CalendarSidebarRight /> : null}
      </div>
    </div>
  );
};

export default CalendarLayout;
