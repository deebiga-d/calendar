"use client";

import React, { useState, useRef, useEffect } from "react";
import "./ScheduleDropdown.css";

import { DropdownScheduleData } from "../../ScheduleTypes";
export type ScheduleFormData = {
  title: string;
  place: string;
  notes: string;
  scheduleDetails: DropdownScheduleData | null;
};


type Props = {
  onClose: () => void;
  onSave: (data: DropdownScheduleData) => void;
};

const ScheduleDropdown = ({ onClose, onSave }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timezone, setTimezone] = useState("");

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

 const handleSave = () => {
  if (!startDate || !endDate || !startTime || !endTime) return;

  const start = new Date(startDate);
  const dayName = start.toLocaleDateString("en-US", { weekday: "long" });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); 
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const summaryText = `Occurs every ${dayName} from ${formatTime(
    startTime
  )} to ${formatTime(endTime)} effective ${formatDate(
    startDate
  )} until ${formatDate(endDate)}`;

  onSave({
    startDate,
    endDate,
    startTime,
    endTime,
    timezone,
    summaryText,  
  });
};


  return (
    <div className="schedule-dropdown" ref={dropdownRef}>
      <div className="schedule-row">
        <div className="schedule-field">
          <label>Start Date*</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="schedule-field">
          <label>End Date*</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="schedule-field">
          <label>Start Time*</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="schedule-field">
          <label>End Time*</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="schedule-row">
        <div className="schedule-field">
          <label>Timezone*</label>
          <input
            type="text"
            placeholder="Search for city..."
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDropdown;
