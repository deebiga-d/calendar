"use client";

import { useState } from "react";
import dayjs from "dayjs";
import ScheduleDropdown from "../ScheduleDropdown/ScheduleDropdown";

import {
  DropdownScheduleData,
} from "../../ScheduleTypes";

import "./EditMeeting.css";

type Props = {
  meeting: any;
  onClose: () => void;
  onUpdate: (updatedMeeting: any) => void;
  onDelete: (meetingId: string | number) => void;
};

const EditMeeting = ({ meeting, onClose, onUpdate, onDelete }: Props) => {
  const [title, setTitle] = useState(meeting?.title || "");
  const [place, setPlace] = useState(meeting?.place || "");
  const [notes, setNotes] = useState(meeting?.notes || "");

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
 const [scheduleDetails, setScheduleDetails] =
  useState<DropdownScheduleData | null>({
    startDate: meeting?.startDateTime
      ? dayjs(meeting.startDateTime).format("YYYY-MM-DD")
      : "",
    startTime: meeting?.startDateTime
      ? dayjs(meeting.startDateTime).format("HH:mm")
      : "",
    endDate: meeting?.endDateTime
      ? dayjs(meeting.endDateTime).format("YYYY-MM-DD")
      : "",
    endTime: meeting?.endDateTime
      ? dayjs(meeting.endDateTime).format("HH:mm")
      : "",
    summaryText: meeting?.startDateTime
      ? dayjs(meeting.startDateTime).format("MMM D, YYYY HH:mm")
      : "",
    timezone: meeting?.timezone || "UTC",
  });
  const [error, setError] = useState("");

  const scheduleText = scheduleDetails?.summaryText || "Update Schedule";

  const handleUpdateMeeting = () => {
    if (!scheduleDetails) {
      setError("Please select schedule details");
      return;
    }

    const updatedMeeting = {
      ...meeting,
      title,
      place,
      notes,
      startDateTime: dayjs(
        `${scheduleDetails.startDate} ${scheduleDetails.startTime}`
      ).toISOString(),
      endDateTime: dayjs(
        `${scheduleDetails.endDate} ${scheduleDetails.endTime}`
      ).toISOString(),
    };

    onUpdate(updatedMeeting);
    onClose();
  };

  const handleDelete = () => {
    onDelete(meeting.id);
    onClose();
  };

  return (
    <div className="edit-meeting-modal">
      <div className="modal-overlay">
        <div className="modal-container">
          {/* Header */}
          <div className="modal-headerview">
            <div>
              <h2 className="modal-header-tittle">Edit Meeting</h2>
              <p className="modal-header-description">
                Update your meeting details.
              </p>
            </div>

            <button type="button" className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Title */}
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
              {/* Scheduler */}
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

              {/* Place */}
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

            {/* Notes */}
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

          {/* Footer */}
          <div className="modal-footerview"> 
            <div className="left-btn">
               <button type="button" className="delete-but" onClick={handleDelete}>
                <img src="/assets/delete.svg" alt="Delete" />
              Delete Meeting  
            </button>
            </div> 
            <div className="right-btns">
            <button type="button" className="back-btn" onClick={onClose}>
              Back
            </button>

           

            <button type="button" className="add-btn" onClick={handleUpdateMeeting}>
              Update Meeting
            </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMeeting;