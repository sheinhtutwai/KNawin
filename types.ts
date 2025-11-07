
export interface ScheduleItem {
  dayNumber: number;
  date: string; // Formatted for display
  dateKey: string; // YYYY-MM-DD for logic
  dayOfWeek: string;
  stage: number;
  guna: string;
  rounds: number;
}
