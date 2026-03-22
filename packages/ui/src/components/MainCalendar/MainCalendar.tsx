
"use client";

import MonthView from "../MonthView/MonthView";
import WeekView from "../WeekView/WeekView";
import TodayView from "../TodayView/TodayView";
import "./MainCalendar.css";
type Props = {
  activeView: "today" | "week" | "month";
    currentDate: Date;
    userSelectedDate?: Date | null;
    schedules: any[]; 
    
};

const MainCalendar = ({ activeView, currentDate, userSelectedDate, schedules   }: Props) => { 
    return (
 <div className="main-calendar-wrapper">
      {activeView === "today" && <TodayView currentDate={currentDate} schedules={schedules} />}
      {activeView === "week" && <WeekView currentDate={currentDate} userSelectedDate={userSelectedDate} schedules={schedules} />}
      {activeView === "month" && <MonthView currentDate={currentDate} schedules={schedules} />}
    </div> 
    )
};

export default MainCalendar;
