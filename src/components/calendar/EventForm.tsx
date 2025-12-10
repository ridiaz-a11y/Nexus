import { useState } from "react";
import { CalendarEvent, Deadline, Meeting } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventFormProps {
  event?: CalendarEvent | Deadline | Meeting;
  onSave: (event: CalendarEvent | Deadline | Meeting) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
  type?: "event" | "deadline" | "meeting";
}

export const EventForm = ({
  event,
  onSave,
  onCancel,
  isOpen,
  type = "event",
}: EventFormProps) => {
  const [summary, setSummary] = useState(event?.summary || "");
  const [description, setDescription] = useState(event?.description || "");
  const [location, setLocation] = useState(event?.location || "");
  const [date, setDate] = useState<Date>(
    event?.start.dateTime
      ? new Date(event.start.dateTime)
      : event?.start.date
      ? new Date(event.start.date)
      : new Date()
  );
  const [startTime, setStartTime] = useState(
    event?.start.dateTime
      ? format(new Date(event.start.dateTime), "HH:mm")
      : "09:00"
  );
  const [endTime, setEndTime] = useState(
    event?.end.dateTime
      ? format(new Date(event.end.dateTime), "HH:mm")
      : "10:00"
  );
  const [allDay, setAllDay] = useState(!event?.start.dateTime && !!event?.start.date);
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    "isDeadline" in (event || {}) ? (event as Deadline).priority || "medium" : "medium"
  );
  const [reminderMinutes, setReminderMinutes] = useState(15);

  const handleSave = async () => {
    const startDateTime = allDay
      ? { date: format(date, "yyyy-MM-dd") }
      : {
          dateTime: new Date(
            `${format(date, "yyyy-MM-dd")}T${startTime}:00`
          ).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

    const endDateTime = allDay
      ? { date: format(date, "yyyy-MM-dd") }
      : {
          dateTime: new Date(
            `${format(date, "yyyy-MM-dd")}T${endTime}:00`
          ).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

    const baseEvent: CalendarEvent = {
      summary,
      description,
      location,
      start: startDateTime,
      end: endDateTime,
      reminders: [
        { method: "popup", minutes: reminderMinutes },
        { method: "email", minutes: reminderMinutes * 2 },
      ],
    };

    let finalEvent: CalendarEvent | Deadline | Meeting;

    if (type === "deadline") {
      finalEvent = {
        ...baseEvent,
        isDeadline: true,
        priority,
        completed: false,
      } as Deadline;
    } else if (type === "meeting") {
      finalEvent = {
        ...baseEvent,
        isMeeting: true,
      } as Meeting;
    } else {
      finalEvent = baseEvent;
    }

    await onSave(finalEvent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "deadline"
              ? "Nueva Fecha Límite"
              : type === "meeting"
              ? "Nueva Reunión"
              : "Nuevo Evento"}
          </DialogTitle>
          <DialogDescription>
            {type === "deadline"
              ? "Crea una fecha límite con prioridad"
              : type === "meeting"
              ? "Programa una reunión con participantes"
              : "Agrega un evento a tu calendario"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Título *</Label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Nombre del evento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles adicionales..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Selecciona fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Todo el día</Label>
              <Select value={allDay ? "yes" : "no"} onValueChange={(v) => setAllDay(v === "yes")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!allDay && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora de inicio</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Hora de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Dirección o enlace de videollamada"
                className="pl-9"
              />
            </div>
          </div>

          {type === "deadline" && (
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as "low" | "medium" | "high")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reminder">Recordatorio (minutos antes)</Label>
            <Input
              id="reminder"
              type="number"
              min="0"
              value={reminderMinutes}
              onChange={(e) => setReminderMinutes(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!summary}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

