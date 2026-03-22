    // "use client";

    // import dayjs, { Dayjs } from "dayjs";

    // type Props = {
    //   currentDate: Dayjs;
    //   onDateSelect: (date: Dayjs) => void;
    // };

    // export function CalendarSidebar({ currentDate, onDateSelect }: Props) {
    //   const startOfMonth = currentDate.startOf("month");
    //   const daysInMonth = currentDate.daysInMonth();
    //   const startDay = startOfMonth.day();

    //   const days: (Dayjs | null)[] = [];

    //   for (let i = 0; i < startDay; i++) days.push(null);
    //   for (let d = 1; d <= daysInMonth; d++) {
    //     days.push(currentDate.date(d));
    //   }

    //   return (
    //     <aside className="sidebar">
    //       <div className="sidebar-header ">
    //         <h3>{currentDate.format("MMMM YYYY")}</h3>
    //       </div>

    //       <div className="mini-calendar">
    //         {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
    //   <div key={i} className="mini-header">
    //     {d}
    //   </div>
    // ))}
    // {days.map((day, i) =>
    //           day ? (
    //             <button
    //               key={i}
    //               className={`mini-day ${
    //                 day.isSame(currentDate, "day") ? "active" : ""
    //               }`}
    //               onClick={() => onDateSelect(day)}
    //             >
    //               {day.date()}
    //             </button>
    //           ) : (
    //             <div key={i} className="mini-empty" />
    //           )
    //         )}
    //       </div>
    //     </aside>
    //   );
    // } 
"use client";   
import MiniCalendar from "../Minicalendar/MiniCalendar";
import "./CalendarSidebar.css"; 


// @ts-ignore


const CalendarSidebar = () => {
    return <div className="sidebar-container">
        <div className="lessons-event-container">
            <div className="sidebar-lessons-container">
                <div>   
                    <p>Total Lessons Today</p>
                    <p>21</p> 
                    <p>+2 up from yesterday </p>
                </div> 
                <div className="header-lessons-img-container">   
                   <div className="header-lessons-img-container">
            <img src="/assets/contact.svg" alt="Contact Icon" />
          </div>
                </div>
            </div> 
            <div className="sidebar-event-container">
                <div>   
                    <p>Total Events Today</p>
                    <p>21</p> 
                    <p>+2 up from yesterday </p>
                </div> 
                <div className="header-lessons-img-container">   
                  <div className="header-lessons-img-container">
            <img src="/assets/contact.svg" alt="Contact Icon" />
          </div>
                </div>
            </div> 
        </div>  

        {/* <MiniCalendar /> */}


      
    </div>; 
}   
export default CalendarSidebar;
