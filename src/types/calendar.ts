// Tipos para Google Calendar
export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
  location?: string;
  attendees?: Attendee[];
  reminders?: Reminder[];
  recurrence?: string[];
  colorId?: string;
  status?: "confirmed" | "tentative" | "cancelled";
  visibility?: "default" | "public" | "private" | "confidential";
}

export interface EventDateTime {
  date?: string; // YYYY-MM-DD para eventos de todo el día
  dateTime?: string; // RFC3339 para eventos con hora
  timeZone?: string;
}

export interface Attendee {
  email: string;
  displayName?: string;
  responseStatus?: "needsAction" | "declined" | "tentative" | "accepted";
  organizer?: boolean;
}

export interface Reminder {
  method: "email" | "popup";
  minutes: number;
}

export interface Deadline extends CalendarEvent {
  isDeadline: true;
  priority: "low" | "medium" | "high";
  completed?: boolean;
}

export interface Meeting extends CalendarEvent {
  isMeeting: true;
  meetingLink?: string;
  agenda?: string;
}

