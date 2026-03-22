"use client";

import "./ScheduledView.css";
import { Repeat } from "lucide-react";
import dayjs from "dayjs";

type Schedule = {
  id: string;
  title: string;
  place?: string;
  notes?: string;
  startDateTime: string;
  endDateTime: string;
};

type Props = {
  title?: string;
  startTime?: string;
  color?: "yellow" | "blue" | "purple";
  schedule?: Schedule;
};

const ScheduledView = ({ title, startTime, color = "yellow", schedule }: Props) => {
  const displayTitle = title ?? schedule?.title ?? "";
  const displayStart = startTime ?? (schedule ? dayjs(schedule.startDateTime).format("hh:mm A") : "");

  return (
    <div className={`scheduled-item ${color}`}>
      <div className="scheduled-content">
        <span className="scheduled-time">{displayStart}</span>
        <span className="scheduled-title">{displayTitle}</span>
      </div>

      <Repeat size={16} className="repeat-icon" />
    </div>
  );
};

export default ScheduledView;



