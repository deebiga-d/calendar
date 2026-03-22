  import dayjs, { Dayjs } from "dayjs";
  import "./dayview.css";

  type Schedule = {
    id: string;
    date: Dayjs;
    title: string;
    time: string; 
  };

  type Props = {
    day: Dayjs;
    schedules: Schedule[];
  };

  const HOURS = Array.from({ length: 24 }, (_, i) => i); // 12 AM – 11 PM

  export function DayView({ day, schedules }: Props) {
    return (
      <div className="teams-day-view">
        <div className="teams-day-scroll">
          {/* Time column */}
          <div className="time-column">
            <div className="time-header" />
            {HOURS.map((h) => (
              <div key={h} className="time-cell">
                {dayjs().hour(h).minute(0).format("h A")}
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="day-container">
            <div className="day-header">
              {day.format("dddd, MMM DD")}
            </div>

            <div className="day-hours">
              {HOURS.map((h) => {
                const hourEvents = schedules.filter(
                  (s) =>
                    s.date.isSame(day, "day") &&
                    dayjs(s.time, "HH:mm").hour() === h
                );

                return (
                  <div key={h} className="hour-cell">
                    {hourEvents.map((event) => (
                      <div key={event.id} className="teams-event">
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">{event.time}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
