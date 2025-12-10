import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectTask, KanbanStatus } from "@/types/projectflow";
import { Plus, Trash2, Calendar } from "lucide-react";

interface KanbanBoardProps {
  tasks: ProjectTask[];
  onTaskAdd: (task: ProjectTask) => void;
  onTaskUpdate: (task: ProjectTask) => void;
  onTaskDelete: (taskId: string) => void;
}

export const KanbanBoard = ({ tasks, onTaskAdd, onTaskUpdate, onTaskDelete }: KanbanBoardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<ProjectTask>>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  const columns: { status: KanbanStatus; label: string; color: string }[] = [
    { status: "todo", label: "Por Hacer", color: "bg-gray-100" },
    { status: "doing", label: "En Progreso", color: "bg-blue-100" },
    { status: "review", label: "En Revisión", color: "bg-yellow-100" },
    { status: "done", label: "Completado", color: "bg-green-100" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddTask = () => {
    if (newTask.title?.trim()) {
      const task: ProjectTask = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description || "",
        status: (newTask.status as KanbanStatus) || "todo",
        priority: (newTask.priority as "low" | "medium" | "high") || "medium",
        dueDate: newTask.dueDate || "",
      };
      onTaskAdd(task);
      setNewTask({ title: "", description: "", status: "todo", priority: "medium", dueDate: "" });
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tablero Kanban</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription>
                Agrega una nueva tarea al proyecto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  placeholder="Título de la tarea"
                  value={newTask.title || ""}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <Textarea
                  placeholder="Descripción detallada"
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estado</label>
                  <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value as KanbanStatus })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Por Hacer</SelectItem>
                      <SelectItem value="doing">En Progreso</SelectItem>
                      <SelectItem value="review">En Revisión</SelectItem>
                      <SelectItem value="done">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prioridad</label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}>
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
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Vencimiento</label>
                <Input
                  type="date"
                  value={newTask.dueDate || ""}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <Button onClick={handleAddTask} className="w-full">
                Crear Tarea
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.status} className={`${column.color} rounded-lg p-4 min-h-96`}>
            <h3 className="font-semibold text-lg mb-4">{column.label}</h3>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === column.status)
                .map((task) => (
                  <Card key={task.id} className="cursor-move hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm flex-1">{task.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onTaskDelete(task.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      {task.description && (
                        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                      )}
                      <div className="flex gap-2 flex-wrap mb-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                        </Badge>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString("es-ES")}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
