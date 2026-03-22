"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ScheduleDropdown from "../ScheduleDropdown/ScheduleDropdown";
import { createPortal } from "react-dom";

import {
  DropdownScheduleData,
  CreateSchedulePayload,
} from "../../ScheduleTypes";

import "./AddMeetingModal.css";

type Props = {
  onClose: () => void;
  onSubmit: (data: CreateSchedulePayload) => void;
  selectedDate: Date;
};

const AddMeetingModal = ({ onClose, onSubmit, selectedDate }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDetails, setScheduleDetails] =
    useState<DropdownScheduleData | null>(null);

  const [error, setError] = useState("");

  const scheduleText = scheduleDetails?.summaryText || "Update Schedule";

  const handleAddMeeting = () => {
    if (!scheduleDetails) {
      setError("Please select schedule details");
      return;
    }

    const startDateTime = dayjs(
      `${scheduleDetails.startDate} ${scheduleDetails.startTime}`
    ).toISOString();

    const endDateTime = dayjs(
      `${scheduleDetails.endDate} ${scheduleDetails.endTime}`
    ).toISOString();

    const payload: CreateSchedulePayload = {
      title,
      place,
      notes,
      startDateTime,
      endDateTime,
    };

    onSubmit(payload);
    onClose();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="add-meeting-modal">
      <div className="modal-overlay">
        <div className="modal-container">
           
            <div className="modal-headerview">
              <div>
                <h2 className="modal-header-tittle">Add Meeting</h2>

              <p className="modal-header-description">
                Let's get those little innovators growing! Fill out to block your
                schedule!
              </p>
            </div>

            <button type="button" className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                Meeting Title<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="form-group scheduler-group">
                <label className="form-label">
                  Scheduler<span>*</span>
                </label>

                <div
                  className={`fake-select ${
                    !scheduleDetails ? "placeholder" : ""
                  } ${isScheduleOpen ? "open" : ""}`}
                  onClick={() => setIsScheduleOpen((prev) => !prev)}
                >
                  <span>{scheduleText}</span>

                  <img
                    src="/assets/arrow_drop_down.svg"
                    alt="Dropdown Icon"
                    className="dropdown-icon"
                  />
                </div>

                {error && <p className="error-text">{error}</p>}

                {isScheduleOpen && (
                  <div className="schedule-dropdown-wrapper">
                    <ScheduleDropdown
                      onClose={() => setIsScheduleOpen(false)}
                      onSave={(data) => {
                        setScheduleDetails(data);
                        setError("");
                        setIsScheduleOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Place</label>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>

              <textarea
                className="form-input"
                placeholder="Optional Notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footerview">
            <button type="button" className="back-btn" onClick={onClose}>
              Back
            </button>

            <button type="button" className="add-btn" onClick={handleAddMeeting}>
              Add Meeting
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddMeetingModal;