"use client";

import dayjs from "dayjs";
import ScheduledView from "../ScheduledView/ScheduledView";
import "./DayMeetingsModal.css";

// duplicate of schedule shape used throughout the calendar
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
  date: dayjs.Dayjs;
  meetings: Schedule[];
  onClose: () => void;
};

const DayMeetingsModal = ({ date, meetings, onClose }: Props) => {
  return (
    <div className="month-day-meetings-modal modal-overlays" onClick={onClose}>
      <div
        className="modal-container meetings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-header-tittle">
              {date.format("MMMM D, YYYY")}
            </h2>
            <p className="modal-header-description">
              {meetings.length} meeting{meetings.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body meetings-body">
          {meetings.map((m) => (
            <ScheduledView
              key={m.id}
              title={m.title}
              startTime={dayjs(m.startDateTime).format("hh:mm A")}
            />
          ))}
        </div>

        <div className="modal-footer">
          <button className="back-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayMeetingsModal;
