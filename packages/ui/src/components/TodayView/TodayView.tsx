"use client";
import dayjs from "dayjs";
import "./TodayView.css";
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

const TodayView = ({
  currentDate,
  schedules = [],
}: {
  currentDate: Date;
  schedules: Schedule[];
}) => {
  const today = dayjs(currentDate);

  const todaySchedules = schedules.filter((schedule) =>
    dayjs(schedule.startDateTime).isSame(today, "day")
  );

  return (
    <div className="today-view-container">
      <div className="today-date-header">
        <span className="todays-date">
          <span className="day">{today.format("dddd")}</span>{" "}
          <span className="date">
            <strong>{today.format("DD")}</strong>
          </span>{" "}
          <span className="month-year">{today.format("MMMM YYYY")}</span>
        </span>
      </div>

      <div className="today-grid">
        {hours.map((time, index) => {
          const hourStart = today.hour(index).minute(0);

          const hourSchedules = todaySchedules.filter((schedule) =>
            dayjs(schedule.startDateTime).isSame(hourStart, "hour")
          );

          return (
            <div key={time} className="time-row">
              <div className="time-label">{time}</div>
              <div className="time-slot">
                {hourSchedules.map((schedule) => (
                  <ScheduledView key={schedule.id} schedule={schedule} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayView;