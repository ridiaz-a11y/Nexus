import { useState, useEffect } from "react";
import { CalendarEvent, Deadline, Meeting } from "@/types/calendar";
import { getCalendarService } from "@/services/google-calendar.service";
import { EventForm } from "@/components/calendar/EventForm";
import { EventList } from "@/components/calendar/EventList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  AlertCircle,
  Video,
  Search,
} from "lucide-react";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

const Calendar = () => {
  const [events, setEvents] = useState<(CalendarEvent | Deadline | Meeting)[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"event" | "deadline" | "meeting">("event");
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | Deadline | Meeting | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const calendarService = getCalendarService();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const now = new Date();
      const weekStart = startOfWeek(now, { locale: es });
      const weekEnd = endOfWeek(now, { locale: es });

      const allEvents = await calendarService.getEvents(
        weekStart.toISOString(),
        weekEnd.toISOString()
      );
      setEvents(allEvents);

      const allDeadlines = await calendarService.getDeadlines(
        weekStart.toISOString(),
        weekEnd.toISOString()
      );
      setDeadlines(allDeadlines);

      const allMeetings = await calendarService.getMeetings(
        weekStart.toISOString(),
        weekEnd.toISOString()
      );
      setMeetings(allMeetings);
    } catch (error) {
      toast.error("Error al cargar eventos");
      console.error(error);
    }
  };

  const handleCreateEvent = (type: "event" | "deadline" | "meeting") => {
    setFormType(type);
    setEditingEvent(undefined);
    setIsFormOpen(true);
  };

  const handleSaveEvent = async (event: CalendarEvent | Deadline | Meeting) => {
    try {
      if (editingEvent?.id) {
        await calendarService.updateEvent(editingEvent.id, event);
        toast.success("Evento actualizado exitosamente");
      } else {
        await calendarService.createEvent(event);
        toast.success(
          `${
            formType === "deadline"
              ? "Fecha límite"
              : formType === "meeting"
              ? "Reunión"
              : "Evento"
          } creado exitosamente`
        );
      }
      setIsFormOpen(false);
      setEditingEvent(undefined);
      await loadEvents();
    } catch (error) {
      toast.error("Error al guardar el evento");
      console.error(error);
    }
  };

  const handleCompleteDeadline = async (deadlineId: string) => {
    try {
      await calendarService.completeDeadline(deadlineId);
      toast.success("Fecha límite marcada como completada");
      await loadEvents();
    } catch (error) {
      toast.error("Error al completar la fecha límite");
    }
  };

  const handleEventClick = (event: CalendarEvent | Deadline | Meeting) => {
    setEditingEvent(event);
    if ("isDeadline" in event && event.isDeadline) {
      setFormType("deadline");
    } else if ("isMeeting" in event && event.isMeeting) {
      setFormType("meeting");
    } else {
      setFormType("event");
    }
    setIsFormOpen(true);
  };

  const filteredEvents = events.filter(
    (e) =>
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeadlines = deadlines.filter(
    (d) =>
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMeetings = meetings.filter(
    (m) =>
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Google Calendar</h1>
          <p className="text-muted-foreground">Gestión del tiempo y eventos</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("event")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Evento
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("deadline")}
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Fecha Límite
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("meeting")}
            className="flex items-center gap-2"
          >
            <Video className="h-4 w-4" />
            Reunión
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Búsqueda</CardTitle>
              <CardDescription>Busca eventos, fechas límite o reuniones</CardDescription>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos los Eventos</TabsTrigger>
          <TabsTrigger value="deadlines">Fechas Límite</TabsTrigger>
          <TabsTrigger value="meetings">Reuniones</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Eventos de la Semana</h2>
            <p className="text-sm text-muted-foreground">
              {format(startOfWeek(new Date(), { locale: es }), "PPP", { locale: es })} -{" "}
              {format(endOfWeek(new Date(), { locale: es }), "PPP", { locale: es })}
            </p>
          </div>
          <EventList
            events={filteredEvents}
            onEventClick={handleEventClick}
            onCompleteDeadline={handleCompleteDeadline}
          />
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Fechas Límite
            </h2>
            <Button
              size="sm"
              onClick={() => handleCreateEvent("deadline")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nueva Fecha Límite
            </Button>
          </div>
          <EventList
            events={filteredDeadlines}
            onEventClick={handleEventClick}
            onCompleteDeadline={handleCompleteDeadline}
          />
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Video className="h-5 w-5" />
              Reuniones
            </h2>
            <Button
              size="sm"
              onClick={() => handleCreateEvent("meeting")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nueva Reunión
            </Button>
          </div>
          <EventList
            events={filteredMeetings}
            onEventClick={handleEventClick}
            onCompleteDeadline={handleCompleteDeadline}
          />
        </TabsContent>
      </Tabs>

      <EventForm
        event={editingEvent}
        onSave={handleSaveEvent}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingEvent(undefined);
        }}
        isOpen={isFormOpen}
        type={formType}
      />
    </div>
  );
};

export default Calendar;

