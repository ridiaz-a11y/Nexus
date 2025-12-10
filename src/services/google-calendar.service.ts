import { CalendarEvent, Deadline, Meeting, Reminder } from "@/types/calendar";

// Servicio para interactuar con Google Calendar API
export class GoogleCalendarService {
  private apiKey: string;
  private accessToken: string | null = null;
  private calendarId: string = "primary";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setCalendarId(calendarId: string) {
    this.calendarId = calendarId;
  }

  // Crear evento
  async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
    // Simulación - reemplazar con llamada real a API
    return {
      ...event,
      id: `event_${Date.now()}`,
      status: event.status || "confirmed",
    };
  }

  // Obtener eventos en un rango de fechas
  async getEvents(
    timeMin: string,
    timeMax: string,
    calendarId?: string
  ): Promise<CalendarEvent[]> {
    // Simulación - reemplazar con llamada real a API
    return [];
  }

  // Obtener evento por ID
  async getEvent(eventId: string): Promise<CalendarEvent | null> {
    // Simulación - reemplazar con llamada real a API
    return null;
  }

  // Actualizar evento
  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    // Simulación - reemplazar con llamada real a API
    return event as CalendarEvent;
  }

  // Eliminar evento
  async deleteEvent(eventId: string): Promise<void> {
    // Simulación - reemplazar con llamada real a API
  }

  // Crear reunión
  async createMeeting(meeting: Meeting): Promise<Meeting> {
    const event = await this.createEvent(meeting);
    return {
      ...event,
      isMeeting: true,
    } as Meeting;
  }

  // Obtener reuniones
  async getMeetings(timeMin: string, timeMax: string): Promise<Meeting[]> {
    const events = await this.getEvents(timeMin, timeMax);
    return events.filter((e) => "isMeeting" in e && e.isMeeting) as Meeting[];
  }

  // Crear fecha límite (deadline)
  async createDeadline(deadline: Deadline): Promise<Deadline> {
    const event = await this.createEvent(deadline);
    return {
      ...event,
      isDeadline: true,
      priority: deadline.priority,
      completed: false,
    } as Deadline;
  }

  // Obtener fechas límite
  async getDeadlines(timeMin: string, timeMax: string): Promise<Deadline[]> {
    const events = await this.getEvents(timeMin, timeMax);
    return events.filter((e) => "isDeadline" in e && e.isDeadline) as Deadline[];
  }

  // Marcar deadline como completado
  async completeDeadline(deadlineId: string): Promise<Deadline> {
    const deadline = await this.getEvent(deadlineId);
    if (!deadline || !("isDeadline" in deadline)) {
      throw new Error("Deadline no encontrado");
    }
    return await this.updateEvent(deadlineId, {
      ...deadline,
      completed: true,
    }) as Deadline;
  }

  // Configurar recordatorios
  async setReminders(eventId: string, reminders: Reminder[]): Promise<CalendarEvent> {
    const event = await this.getEvent(eventId);
    if (!event) {
      throw new Error("Evento no encontrado");
    }
    return await this.updateEvent(eventId, { reminders });
  }

  // Agregar recordatorio por defecto
  async addDefaultReminder(eventId: string, minutes: number = 15): Promise<CalendarEvent> {
    const reminders: Reminder[] = [
      { method: "popup", minutes },
      { method: "email", minutes: minutes * 2 },
    ];
    return await this.setReminders(eventId, reminders);
  }

  // Obtener eventos próximos
  async getUpcomingEvents(days: number = 7): Promise<CalendarEvent[]> {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
    return await this.getEvents(timeMin, timeMax);
  }

  // Obtener eventos del día
  async getTodayEvents(): Promise<CalendarEvent[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.getEvents(today.toISOString(), tomorrow.toISOString());
  }

  // Buscar eventos
  async searchEvents(query: string, timeMin?: string, timeMax?: string): Promise<CalendarEvent[]> {
    const events = await this.getEvents(
      timeMin || new Date().toISOString(),
      timeMax || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    );
    return events.filter(
      (e) =>
        e.summary.toLowerCase().includes(query.toLowerCase()) ||
        e.description?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// Instancia singleton
let calendarServiceInstance: GoogleCalendarService | null = null;

export const getCalendarService = (): GoogleCalendarService => {
  if (!calendarServiceInstance) {
    const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || "";
    calendarServiceInstance = new GoogleCalendarService(apiKey);
  }
  return calendarServiceInstance;
};

