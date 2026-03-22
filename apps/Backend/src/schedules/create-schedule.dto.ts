export class CreateScheduleDto {
  title: string;
  date: Date;
  place?: string;
  notes?: string;
  schedule?: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
    summary: string;
  } | null;
}
