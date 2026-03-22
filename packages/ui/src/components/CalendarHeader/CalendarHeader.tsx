
import "./CalendarHeader.css"; 

import { useState, useRef, useEffect } from "react"; 
import MiniCalendar from "../Minicalendar/MiniCalendar";
import type { CreateSchedulePayload } from "../../ScheduleTypes";
import AddMeetingModal from "../AddMeeting/AddMeetingModal";
import Filter from "../Filter/Filter";
import AddEvent from "../AddEvent/AddEvent";
import Addlesson from "../Addlesson/Addlesson";
type Props = {
  activeView: "today" | "week" | "month";
  onViewChange: (view: "today" | "week" | "month") => void;
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onDateChange?: (date: Date) => void;
  onCreateSchedule: (payload: CreateSchedulePayload) => void;
  onToggleSidebar?: () => void;
}; 


  const CalendarHeader = ({ activeView, onViewChange , currentDate, onPrev, onNext, onDateChange, onCreateSchedule, onToggleSidebar }: Props) => {  

    const [showCalendar, setShowCalendar] = useState(false);  
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showNewMenu, setShowNewMenu] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const toggleCalendar = () => setShowCalendar((prev) => !prev);
    const toggleFilter = () => setShowFilter((prev) => !prev);
    const toggleNewMenu = () => setShowNewMenu((prev) => !prev);

    const calendarRef = useRef<HTMLDivElement>(null);
    const newMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
          setShowCalendar(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (newMenuRef.current && !newMenuRef.current.contains(event.target as Node)) {
          setShowNewMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (showScheduleModal || showFilter || showLessonModal || showEventModal) {
        setShowNewMenu(false);
      }
    }, [showScheduleModal, showFilter, showLessonModal, showEventModal]);

    const todayLabel = currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const handleScheduleSubmit = async (scheduleData: CreateSchedulePayload) => {
  await onCreateSchedule(scheduleData);
  setShowScheduleModal(false);
};

    const handleLessonSubmit = async (lessonData: CreateSchedulePayload) => {
      await onCreateSchedule(lessonData);
      setShowLessonModal(false);
    };

    const handleEventSubmit = async (eventData: CreateSchedulePayload) => {
      await onCreateSchedule(eventData);
      setShowEventModal(false);
    };  

    return (
      <div className="calendar-header-container">
        <div className="calendar-header-left">
          <div className="date-nav">
            <button className="icon-btn" onClick={onPrev}>
              <img src="/assets/left_arrow.svg" alt="Prev" />
            </button>

            <div className="date-btn-wrapper">
              <button className="date-btn" onClick={toggleCalendar}>
                {todayLabel}
                <img src="/assets/down_arrow.svg" alt="Calendar Icon" />
              </button>

              {showCalendar && (
                <div className="mini-calendar-wrapper" ref={calendarRef}>
                  <MiniCalendar currentDate={currentDate} activeView={activeView} onDateSelect={onDateChange} />
                </div>
              )}
            </div>

            <button className="icon-btn" onClick={onNext}>
              <img src="/assets/right_arrow.svg" alt="Next" />
            </button>
          </div>
        </div>

        
        <div className="calendar-header-right">
          <div className="view-switch">
            <button
              className={activeView === "today" ? "active" : ""}
              onClick={() => onViewChange("today")}
            >
              Today
            </button>

            <button
              className={activeView === "week" ? "active" : ""}
              onClick={() => onViewChange("week")}
            >
              Week
            </button>

            <button
              className={activeView === "month" ? "active" : ""}
              onClick={() => onViewChange("month")}
            >
              Month
            </button>
          </div>

          <button className="filter-btn" onClick={toggleFilter}>
            <img src="/assets/filter_icon.svg" alt="Filter" />
          </button>

          <div className="new-btn" ref={newMenuRef}> 
            
            <button className="new-main" onClick={() => setShowScheduleModal(true)}>
              <img src="/assets/new_schedule.svg" alt="New" />
              <span>New</span>
            </button>
            <button className="new-arrow" type="button" onClick={toggleNewMenu}>
              <img src="/assets/arrow_back_ios.svg" alt="More" />
            </button>
         

            {showNewMenu && (
              <div className="new-menu">
                <button type="button" className="new-menu-item" onClick={() => { setShowLessonModal(true); setShowNewMenu(false); }}>
                  <img src="/assets/add_lessons.svg" alt="" />
                  <span>Add Lesson</span>
                </button>
                <button type="button" className="new-menu-item" onClick={() => { setShowScheduleModal(true); setShowNewMenu(false); }}>
                  <img src="/assets/add_meeting.svg" alt="" />
                  <span>Add Meeting</span>
                </button>
                <button type="button" className="new-menu-item" onClick={() => { setShowEventModal(true); setShowNewMenu(false); }}>
                  <img src="/assets/add_event.svg" alt="" />
                  <span>Add Event</span>
                </button>
              </div>
            )}
          </div> 
          <button type="button" className="icon-back-btn" onClick={() => onToggleSidebar?.()}>
            <img src="/assets/back.svg" alt="Back" />
          </button>
        </div>
        {showScheduleModal && (
          <AddMeetingModal
            onClose={() => setShowScheduleModal(false)}
            onSubmit={handleScheduleSubmit}
            selectedDate={currentDate}
          />
        )}
        {showFilter && (
          <Filter onClose={() => setShowFilter(false)} />
        )}
        {showEventModal && (
          <AddEvent
            onClose={() => setShowEventModal(false)}
            onSubmit={handleEventSubmit}
            selectedDate={currentDate}
          />
        )} 
        {showLessonModal && (
          <Addlesson
            onClose={() => setShowLessonModal(false)}
            selectedDate={currentDate}
            onSubmit={handleLessonSubmit}
          />
        )}
      </div>

    );
  };

  export default CalendarHeader;  