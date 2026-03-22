"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ScheduleDropdown from "../ScheduleDropdown/ScheduleDropdown";
import { createPortal } from "react-dom";

import {
  DropdownScheduleData,
  CreateSchedulePayload,
} from "../../ScheduleTypes";

import "./Addlesson.css";

type Props = {
  onClose: () => void;
  onSubmit: (data: CreateSchedulePayload) => void;
  selectedDate: Date;
};

const Addlesson = ({ onClose, onSubmit, selectedDate }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDetails, setScheduleDetails] =
    useState<DropdownScheduleData | null>(null);

  const [error, setError] = useState("");

  const scheduleText = scheduleDetails?.summaryText || "Update Schedule";

//   const handleAddMeeting = () => {
//     if (!scheduleDetails) {
//       setError("Please select schedule details");
//       return;
//     }

   

  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="add-lesson-modal">
      <div className="modal-overlay">
        <div className="modal-container">
           
            <div className="modal-headerview">
              <div>
                <h2 className="modal-header-tittle">Add Lesson</h2>

              <p className="modal-header-description">
              You can view the lesson details. Let's get those little innovators growing! Fill out to block your schedule!
              </p>
            </div>

            <button type="button" className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body"> 
            <div className="row">
            <div className="form-group">
              <label className="form-label">
                Category<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Category"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> 

            </div>
             <div className="form-group schedule_grade">
              <label className="form-label">
              Subject<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            </div>

             <div className="row">
             <div className="form-group schedule_grade">
              <label className="form-label">
              Subject<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            </div> 

            
            <div className="row">
             <div className="form-group schedule_grade">
              <label className="form-label">
              Lesson<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Lesson"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            </div>  


            <div className="row">
            <div className="form-group">
              <label className="form-label">
                Benchmark<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Will be auto-populated !"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> 

            </div>
             <div className="form-group schedule_grade">
              <label className="form-label">
                Purpose<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Enter Purpose"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            </div>

            <div className="row">
            <div className="form-group">
              <label className="form-label">
                Grade<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Grade"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> 

            </div>
             <div className="form-group schedule_grade">
              <label className="form-label">
                Classroom<span>*</span>
              </label>

              <input
                type="text"
                className="form-input"
                placeholder="Select Classroom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
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

            </div> 



            <div className="form-group">
              <label className="form-label">Agenda</label>

              <textarea
                className="form-input-agenda"
                placeholder="Create Agenda..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footerview">
            <button type="button" className="back-btn" onClick={onClose}>
              Back
            </button>

            <button type="button" className="add-btn" >
              Add Lesson
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Addlesson;