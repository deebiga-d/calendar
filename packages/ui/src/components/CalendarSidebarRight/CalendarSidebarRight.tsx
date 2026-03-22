import "./CalendarSidebarRight.css";
import { useState } from "react";

const CalendarSidebarRight = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(true);

  return (
    <div className="calendar-sidebar-right-container">
      <div className="sidebar-section">
        <div className="sideabr-section-heading">
          <div className="sidebar-title">
            <img src="/assets/upcming_schdules.svg" alt="Calendar Icon" />
            <p>Upcoming Daily Overview</p>
          </div>
          <button
            className={`dropdown_button ${isOverviewOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setIsOverviewOpen((prev) => !prev)}
          >
            <img src="/assets/arrow_drop_down.svg" alt="Toggle section" />
          </button>
        </div>

        {isOverviewOpen && (
          <>
            <div className="schedule-card">
              <div className="schedule-time">
                <p className="time">10:00</p>
                <p className="am">AM</p>
              </div>

              <div className="schedule-details">
                <p className="subject">Mathematics - Algebra</p>
                <p className="meta">
                  <span className="item">Infant</span>
                  <span className="item">Class A</span>
                  <span className="item">Social</span>
                </p>
              </div>

              <p className="tag">
                <img src="/assets/timer.svg" alt="Clock Icon" />
                Starting in 18 min
              </p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">
                <p className="time">10:00</p>
                <p className="am">AM</p>
              </div>

              <div className="schedule-details">
                <p className="subject">Mathematics - Algebra</p>
                <p className="meta">
                  <span className="item">Infant</span>
                  <span className="item">Class A</span>
                  <span className="item">Social</span>
                </p>
              </div>

              <p className="tag_purples">
                <img src="/assets/timer_white.svg" alt="Clock Icon" />
                Starting Soon
              </p>
            </div>

            <p className="last_updated">Last updated: Today, 8:47 AM</p>
          </>
        )}
      </div>

      <div className="sidebar-section">
        <div className="sideabr-section-heading">
          <div className="sidebar-title">
            <img src="/assets/quick_actions.svg" alt="Quick Actions" />
            <p>Quick Actions</p>
          </div>
          <button
            className={`dropdown_button ${isQuickActionsOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setIsQuickActionsOpen((prev) => !prev)}
          >
         <img src="/assets/arrow_drop_down.svg" alt="Arrow Icon" />
          </button>
        </div>

        {isQuickActionsOpen && (
          <div className="quick-actions">
            <button className="button-container">
              <div className="icon_circle_orange">
                <img src="/assets/add_lesson.svg" alt="Add Lesson Icon" />
              </div>
              <span>Add Lesson</span>
            </button>

            <button className="button-container">
              <div className="icon_circle_orange">
                <img src="/assets/add_lesson.svg" alt="Add Lesson Icon" />
              </div>
              <span>Add Lesson</span>
            </button>

            <button className="button-container">
              <div className="icon_circle_orange">
                <img src="/assets/add_lesson.svg" alt="Add Lesson Icon" />
              </div>
              <span>Add Lesson</span>
            </button>

            <button className="button-container">
              <div className="icon_circle_orange">
                <img src="/assets/add_lesson.svg" alt="Add Lesson Icon" />
              </div>
              <span>Add Lesson</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSidebarRight;
