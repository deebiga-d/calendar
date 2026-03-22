// types/scheduleTypes.ts

export type DropdownScheduleData = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  summaryText: string;
};

// UI form type (used inside modal)
export type ScheduleFormData = {
  title: string;
  place: string;
  notes: string;
  scheduleDetails: DropdownScheduleData | null;
};

// API payload type (sent to backend)
export type CreateSchedulePayload = {
  title: string;
  place: string;
  notes: string;
  startDateTime: string;
  endDateTime: string;
};
