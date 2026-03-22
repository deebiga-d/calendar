import React from "react";
import "./WeekView.css";
import dayjs from "dayjs";
import ScheduledView from "../ScheduledView/ScheduledView";

type Schedule = {
  id: string;
  title: string;
  place?: string;
  notes?: string;
  startDateTime: string;
  endDateTime: string;
};

const hours = Array.from({ length: 24 }, (_, i) =>
  dayjs().hour(i).minute(0).format("h A")
);


const WeekView = ({
  currentDate,
  userSelectedDate,
  schedules = [],
}: {
  currentDate: Date;
  userSelectedDate?: Date | null;
  schedules?: Schedule[];
}) => {
  const dateToUse = userSelectedDate || currentDate;
  const startOfWeek = dayjs(dateToUse).startOf("week").add(1, "day");

  const days = Array.from({ length: 5 }).map((_, index) => {
    const dateObj = startOfWeek.add(index, "day");

    return {
      date: dateObj.format("DD"),
      day: dateObj.format("dddd"),
      isToday: dateObj.isSame(dayjs(), "day"),
      dateObj,
    };
  });

  return (
    <div className="week-view-container">
      <div className="week-grid">
        <div className="time-header"></div>

        {days.map((d, i) => (
          <div key={i} className={`day-header ${d.isToday ? "active-day" : ""}`}>
            <p className="date">{d.date}</p>
            <p className="day">{d.day}</p>
          </div>
        ))}

        {/* BODY ROWS */}
        {hours.map((time, i) => (
          <React.Fragment key={`row-${i}`}>
            <div className="time-cell">{time}</div>

            {days.map((d, j) => {
              const cellSchedules = schedules.filter((s) =>
                dayjs(s.startDateTime).isSame(d.dateObj, "day") &&
                dayjs(s.startDateTime).hour() === i
              );

              return (
                <div className="day-cell" key={`cell-${i}-${j}`}>
                  {cellSchedules.map((s) => (
                    <ScheduledView key={s.id} schedule={s} />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
};

export default WeekView;
