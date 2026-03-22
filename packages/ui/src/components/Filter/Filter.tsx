"use client";

import { useEffect, useState } from "react";

import "./Filter.css";
import { createPortal } from "react-dom";
import Dropdown from "../Dropdown/Dropdown";



const calendarViewOptions = [
  { value: "today", label: "Day View" },
  { value: "workWeek", label: "Work Week view" },
  { value: "week", label: "Week View" },
  { value: "month", label: "Month" },
];

const Filter = ({ onClose }: { onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);
  const [calendarView, setCalendarView] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);


  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="filter-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
           
            <div className="modal-headerview">
              
                <h2 className="modal-header-tittle">Filters</h2>

            
            

            <button type="button" className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div> 
          <div className="modal-body"> 
            <div className="filter-group">
            <label>Calendar View</label>
            <Dropdown
              placeholder="Select view"
              value={calendarView}
              options={calendarViewOptions}
              onChange={(v) => setCalendarView(v)}
            /> 
            
            </div>
            <div className="filter-button-container filter-group">
              <label>Event Type</label>
              <div className="filter-button-group ">
                <button type="button" className="filter-button filter-button--lessons">
                  <input type="checkbox" className="filter-button-checkbox filter-button-checkbox--lessons" />
                  <span>Lessons</span>
                </button>
                <button type="button" className="filter-button filter-button--meetings">
                  <input type="checkbox" className="filter-button-checkbox filter-button-checkbox--meetings" />
                  <span>Meetings</span>
                </button>
                <button type="button" className="filter-button filter-button--events">
                  <input type="checkbox" className="filter-button-checkbox filter-button-checkbox--events" />
                  <span>Events</span>
                </button>
              </div>
            </div>

            <div className="filter-group">
            <label>Grade</label>
            <Dropdown
              placeholder="Select view"
              value={calendarView}
              options={calendarViewOptions}
              onChange={(v) => setCalendarView(v)}
            /> 
            
            </div>
            <div className="filter-group">
            <label>Classroom</label>
            <Dropdown
              placeholder="Select view"
              value={calendarView}
              options={calendarViewOptions}
              onChange={(v) => setCalendarView(v)}
            /> 
            
            </div> 
            <div className="filter-actions">
              <button type="button" className="filter-button-reset">Reset</button>
              <button type="button" className="filter-button-apply">Apply Filters</button>
            </div>
          </div>


         
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Filter;