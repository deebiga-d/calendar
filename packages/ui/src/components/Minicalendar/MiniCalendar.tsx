import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localeData from "dayjs/plugin/localeData";

import "./MiniCalendar.css";


dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


type MiniCalendarProps = {
  currentDate: Date;
  activeView: "today" | "week" | "month";
  onDateSelect?: (date: Date) => void;
}; 


const MiniCalendar = ({ currentDate, activeView, onDateSelect }: MiniCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const [userSelectedDate, setUserSelectedDate] = useState<dayjs.Dayjs | null>(null); 
 const [showMonthDropdown, setShowMonthDropdown] = useState(false);
const [showYearDropdown, setShowYearDropdown] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
  
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  const month = selectedDate.format("MMMM");
  const year = selectedDate.format("YYYY"); 
  
dayjs.extend(localeData); 
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData); 
  const daysInMonth = selectedDate.daysInMonth();
  const firstDayOfMonth = selectedDate.startOf("month").day();
  const months = dayjs.months(); 
const years = Array.from({ length: 21 }, (_, i) => dayjs().year() - 10 + i);


const cells: (number | null)[] = [];
for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
for (let i = 1; i <= daysInMonth; i++) cells.push(i);


const weeks: (number | null)[][] = [];
for (let i = 0; i < cells.length; i += 7) { 
  weeks.push(cells.slice(i, i + 7));
}

const handleMonthSelect = (monthIndex: number) => {
  setSelectedDate(prev => prev.month(monthIndex));
  setShowMonthDropdown(false);
};

const handleYearSelect = (year: number) => {
  setSelectedDate(prev => prev.year(year));
  setShowYearDropdown(false);
};

  const today = dayjs(); 
   const startOfWeek = today.startOf("week"); 
  
  const endOfWeek = today.endOf("week");     
    const isToday = (day: number | null) => {
    if (day === null) return false;
    return selectedDate.date(day).isSame(today, "day");
  };

  const isInCurrentWeek = (day: number | null) => {
    if (day === null) return false;
    
    const cellDate = selectedDate.date(day);
    
    
    if (selectedDate.isSame(dayjs(), "month") && !userSelectedDate) {
      const todayWeekStart = dayjs().startOf("week");
      const todayWeekEnd = dayjs().endOf("week");
      return cellDate.isSameOrAfter(todayWeekStart, "day") && cellDate.isSameOrBefore(todayWeekEnd, "day");
    }
    
    
    if (userSelectedDate) {
      const weekStart = userSelectedDate.startOf("week");
      const weekEnd = userSelectedDate.endOf("week");
      return cellDate.isSameOrAfter(weekStart, "day") && cellDate.isSameOrBefore(weekEnd, "day");
    }
    
    return false;
  };

  
  const isCellHighlighted = (day: number | null) => {
    if (day === null) return false;
    const cellDate = selectedDate.date(day);

    if (activeView === "month" || activeView === "today") {
      return cellDate.isSame(today, "day");
    }

    if (activeView === "week") {
      const startOfWeek = today.startOf("week"); 
      const endOfWeek = today.endOf("week");     
      return cellDate.isSameOrAfter(startOfWeek, "day") && cellDate.isSameOrBefore(endOfWeek, "day");
    }

    return false;
  }; 
  const isWeekHighlighted = (week: (number | null)[]) => {
  return week.some(day => day !== null && selectedDate.date(day).isSame(dayjs(), "day"));
};



  const handlePrevMonth = () => setSelectedDate(prev => prev.subtract(1, "month"));
  const handleNextMonth = () => setSelectedDate(prev => prev.add(1, "month"));

  
  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    const clickedDate = selectedDate.date(day);
    setSelectedDate(clickedDate);
    setUserSelectedDate(clickedDate); 
    if (onDateSelect) {
      onDateSelect(clickedDate.toDate());
    }
  };

  return (
    <div className="minicalendar-main-container">
     
      <div className="minicalendar-month-name">
        <button className="mainicalendar-dropdown-but left-dropdown" onClick={handlePrevMonth}>
          <img src="/assets/arrow_back_left.svg" className="leftdropdown-img" alt="Prev" />
        </button>

        <p className="minicalendar-month-year">{month} {year}</p>

        <button className="mainicalendar-dropdown-but rightdropdown" onClick={handleNextMonth}>
          <img src="/assets/arrow_back_right.svg" className="rightdropdown-img" alt="Next" />
        </button>
      </div>

      
     <div className="mincalendar-dropdown-year-container">

  
  <div className="dropdown-wrapper">
    <button
      className="minicalendar-dropdown-btn"
      onClick={() => {
        setShowMonthDropdown(prev => !prev);
        setShowYearDropdown(false);
      }}
    >
      {month}
      <img src="/assets/Blue_arrow.svg"
           className="minicalendar-img-downarrow"
           alt="Dropdown Icon" />
    </button>

    {showMonthDropdown && (
      <div className="dropdown-menu">
        {months.map((m, index) => (
          <div
            key={m}
            className="dropdown-item"
            onClick={() => handleMonthSelect(index)}
          >
            {m}
          </div>
        ))}
      </div>
    )}
  </div>

  
  <div className="dropdown-wrapper">
    <button
      className="minicalendar-dropdown-btn"
      onClick={() => {
        setShowYearDropdown(prev => !prev);
        setShowMonthDropdown(false);
      }}
    >
      {year}
      <img src="/assets/Blue_arrow.svg"
           className="minicalendar-img-downarrow"
           alt="Dropdown Icon" />
    </button>

    {showYearDropdown && (
      <div className="dropdown-menu">
        {years.map((y) => (
          <div
            key={y}
            className="dropdown-item"
            onClick={() => handleYearSelect(y)}
          >
            {y}
          </div>
        ))}
      </div>
    )}
  </div>

</div>

      
      <div className="mini-calendar-days">
        {days.map(day => (
          <span key={day} className="mini-day-name">{day}</span>
        ))}
      </div>

      
       <div className="mini-calendar-dates">
        {cells.map((day, index) => {
          const highlightWeek = activeView === "week" && isInCurrentWeek(day);
          const highlightToday = isToday(day);

          return (
            <span
              key={index}
              className={`${highlightWeek ? "week-highlight" : ""} ${highlightToday ? "highlighted" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
