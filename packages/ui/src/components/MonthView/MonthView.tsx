"use client";

import dayjs from "dayjs";
import { useEffect, useRef, useState, useMemo } from "react";
import "./MonthView.css";
import ScheduledView from "../ScheduledView/ScheduledView";
import DayMeetingsModal from "./DayMeetingsModal";
import EditMeeting from "../EditMetting/EditMeeting";

export type Schedule = {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  place?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Props = {
  currentDate: Date;
  schedules: Schedule[];
};

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MonthView = ({ currentDate, schedules = [] }: Props) => {
  const today = dayjs();

  const [showAllModal, setShowAllModal] = useState(false);
  const [modalDate, setModalDate] = useState<dayjs.Dayjs | null>(null);
  const [modalMeetings, setModalMeetings] = useState<Schedule[]>([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Schedule | null>(null);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridHeight, setGridHeight] = useState(0);

  const [measuredDateNumberHeight, setMeasuredDateNumberHeight] =
    useState<number | null>(null);
  const [measuredEventItemHeight, setMeasuredEventItemHeight] =
    useState<number | null>(null);
  const [measuredCellPadding, setMeasuredCellPadding] =
    useState<number | null>(null);

  const currentMonth = useMemo(
    () => dayjs(currentDate).startOf("month"),
    [currentDate]
  );

  const daysInMonth = currentMonth.daysInMonth();
  const startDayIndex = (currentMonth.day() + 6) % 7;



  const cells = useMemo(() => {
    const arr: (dayjs.Dayjs | null)[] = [];

    for (let i = 0; i < startDayIndex; i++) {
      arr.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(currentMonth.date(d));
    }

    return arr;
  }, [currentMonth, startDayIndex, daysInMonth]);



  const meetingsByDate = useMemo(() => {
    const map: Record<string, Schedule[]> = {};

    schedules.forEach((meeting) => {
      const dateKey = dayjs(meeting.startDateTime).format("YYYY-MM-DD");

      if (!map[dateKey]) map[dateKey] = [];

      map[dateKey].push(meeting);
    });

    Object.values(map).forEach((meetings) =>
      meetings.sort((a, b) =>
        dayjs(a.startDateTime).diff(dayjs(b.startDateTime))
      )
    );

    return map;
  }, [schedules]);

  /* ---------------- HANDLERS ---------------- */

  const handleMoreClick = (date: dayjs.Dayjs, meetings: Schedule[]) => {
    setModalDate(date);
    setModalMeetings(meetings);
    setShowAllModal(true);
  };

  const handleMeetingClick = (meeting: Schedule) => {
    setSelectedMeeting(meeting);
    setShowEditModal(true);
  };

  /* ---------------- RESIZE OBSERVER ---------------- */

  useEffect(() => {
    if (!gridRef.current) return;

    const el = gridRef.current;

    const resizeObserver = new ResizeObserver(() => {
      setGridHeight(el.getBoundingClientRect().height);
    });

    resizeObserver.observe(el);
    setGridHeight(el.getBoundingClientRect().height);

    return () => resizeObserver.disconnect();
  }, [currentDate]);

  /* ---------------- DOM MEASUREMENTS ---------------- */

  useEffect(() => {
    if (!gridRef.current) return;

    const firstDateNum =
      gridRef.current.querySelector<HTMLElement>(".date-number");

    if (firstDateNum) {
      setMeasuredDateNumberHeight(firstDateNum.getBoundingClientRect().height);
    }

    const firstEvent =
      gridRef.current.querySelector<HTMLElement>(".scheduled-item");

    if (firstEvent) {
      setMeasuredEventItemHeight(firstEvent.getBoundingClientRect().height + 4);
    }

    const cell =
      gridRef.current.querySelector<HTMLElement>(".calendar-cell");

    if (cell) {
      const style = window.getComputedStyle(cell);
      const padTop = parseFloat(style.paddingTop) || 0;
      const padBottom = parseFloat(style.paddingBottom) || 0;

      setMeasuredCellPadding(padTop + padBottom);
    }
  }, [gridHeight, schedules]);

  

  return ( 
      <div className="month-view">
    <div className="monthview-container">
    

      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

     

      <div className="calendar-grid" ref={gridRef}>
        {cells.map((date, index) => {
          if (!date) {
            return <div key={index} className="calendar-cell empty" />;
          }

          const isToday = date.isSame(today, "day");

          const meetingsForDay =
            meetingsByDate[date.format("YYYY-MM-DD")] || [];

          const totalRows = Math.ceil(cells.length / 7);

          const cellHeight =
            gridHeight && totalRows ? gridHeight / totalRows : 0;

          const dateNumberHeight = measuredDateNumberHeight || 36;
          const eventItemHeight = measuredEventItemHeight || 44;
          const cellPaddingHeight = measuredCellPadding || 0;

          const availableForEvents = Math.max(
            0,
            cellHeight - dateNumberHeight - cellPaddingHeight
          );

          const fits =
            availableForEvents > 0
              ? Math.floor(availableForEvents / eventItemHeight)
              : 0;

          const visibleCount = gridHeight ? Math.max(0, fits) : 2;

          const visibleMeetings = meetingsForDay.slice(0, visibleCount);

          const remainingCount =
            meetingsForDay.length - visibleMeetings.length;

          return (
            <div key={index} className="calendar-cell">
              <span
                className={`date-number ${isToday ? "today" : ""}`}
              >
                {date.format("DD")}
              </span>

              <div className="meetings-container">
                {visibleMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    onClick={() => handleMeetingClick(meeting)}
                  >
                    <ScheduledView
                      title={meeting.title}
                      startTime={dayjs(meeting.startDateTime).format(
                        "hh:mm A"
                      )}
                    />
                  </div>
                ))}

                {remainingCount > 0 && (
                  <button
                    className="more-meetings"
                    onClick={() =>
                      handleMoreClick(date, meetingsForDay)
                    }
                  >
                    +{remainingCount} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAllModal && modalDate && (
        <DayMeetingsModal
          date={modalDate}
          meetings={modalMeetings}
          onClose={() => setShowAllModal(false)}
        />
      )}

      {showEditModal && selectedMeeting && (
        <EditMeeting
          meeting={selectedMeeting}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
    </div>
  );
};

export default MonthView;