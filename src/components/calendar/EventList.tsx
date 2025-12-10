import { CalendarEvent, Deadline, Meeting } from "@/types/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EventListProps {
  events: (CalendarEvent | Deadline | Meeting)[];
  onEventClick?: (event: CalendarEvent | Deadline | Meeting) => void;
  onCompleteDeadline?: (deadlineId: string) => void;
}

export const EventList = ({ events, onEventClick, onCompleteDeadline }: EventListProps) => {
  const formatEventTime = (event: CalendarEvent) => {
    if (event.start.date) {
      return format(new Date(event.start.date), "PPP", { locale: es });
    }
    if (event.start.dateTime) {
      const start = new Date(event.start.dateTime);
      const end = event.end.dateTime ? new Date(event.end.dateTime) : null;
      return `${format(start, "PPP 'a las' HH:mm", { locale: es })}${end ? ` - ${format(end, "HH:mm")}` : ""}`;
    }
    return "Sin fecha";
  };

  const getEventType = (event: CalendarEvent | Deadline | Meeting) => {
    if ("isDeadline" in event && event.isDeadline) return "deadline";
    if ("isMeeting" in event && event.isMeeting) return "meeting";
    return "event";
  };

  const getPriorityColor = (priority?: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay eventos programados</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const type = getEventType(event);
        const isDeadline = type === "deadline";
        const isMeeting = type === "meeting";
        const deadline = isDeadline ? (event as Deadline) : null;
        const meeting = isMeeting ? (event as Meeting) : null;
        const isCompleted = deadline?.completed;
        const isPast = event.end.dateTime
          ? new Date(event.end.dateTime) < new Date()
          : event.end.date
          ? new Date(event.end.date) < new Date()
          : false;

        return (
          <Card
            key={event.id}
            className={cn(
              "cursor-pointer hover:shadow-md transition-shadow",
              isCompleted && "opacity-60",
              isPast && !isDeadline && "opacity-75"
            )}
            onClick={() => onEventClick?.(event)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isDeadline && (
                      <AlertCircle
                        className={cn(
                          "h-5 w-5",
                          deadline?.priority === "high" && "text-red-500",
                          deadline?.priority === "medium" && "text-yellow-500",
                          deadline?.priority === "low" && "text-blue-500"
                        )}
                      />
                    )}
                    {isMeeting && <Video className="h-5 w-5 text-blue-500" />}
                    {event.summary}
                    {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </CardTitle>
                  {event.description && (
                    <CardDescription className="mt-1">{event.description}</CardDescription>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {isDeadline && deadline?.priority && (
                    <Badge variant={getPriorityColor(deadline.priority)}>
                      {deadline.priority === "high"
                        ? "Alta"
                        : deadline.priority === "medium"
                        ? "Media"
                        : "Baja"}
                    </Badge>
                  )}
                  {isMeeting && <Badge variant="outline">Reunión</Badge>}
                  {isCompleted && <Badge variant="secondary">Completado</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  {formatEventTime(event)}
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                )}
                {event.attendees && event.attendees.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {event.attendees.length} participante{event.attendees.length !== 1 ? "s" : ""}
                  </div>
                )}
                {event.reminders && event.reminders.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Recordatorio: {event.reminders[0].minutes} minutos antes
                  </div>
                )}
                {isDeadline && !isCompleted && (
                  <div className="pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.id) onCompleteDeadline?.(event.id);
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Marcar como completado
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

