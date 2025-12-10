import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KanbanBoard } from "@/components/projectflow/KanbanBoard";
import { ProjectTimeline } from "@/components/projectflow/ProjectTimeline";
import { MethodologyInfo } from "@/components/projectflow/MethodologyInfo";
import { ProjectTask, ProjectMilestone } from "@/types/projectflow";
import { BarChart3, Calendar, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectFlow = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([
    {
      id: "1",
      title: "Configurar proyecto base",
      description: "Configuración inicial del proyecto",
      status: "done",
      priority: "high",
      dueDate: "2025-12-01",
    },
    {
      id: "2",
      title: "Crear página de flujo de proyecto",
      description: "Agregar sección de actividades y metodología",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-12-15",
    },
    {
      id: "3",
      title: "Integración con Trello",
      description: "Conectar con API de Trello",
      status: "todo",
      priority: "medium",
      dueDate: "2025-12-30",
    },
  ]);

  const [milestones, setMilestones] = useState<ProjectMilestone[]>([
    {
      id: "1",
      title: "Fase 1: Desarrollo Inicial",
      description: "Configuración del proyecto y componentes base",
      startDate: "2025-12-01",
      endDate: "2025-12-10",
      progress: 100,
      status: "completed",
    },
    {
      id: "2",
      title: "Fase 2: Flujo de Proyecto",
      description: "Desarrollo del sistema de gestión de tareas",
      startDate: "2025-12-10",
      endDate: "2025-12-20",
      progress: 60,
      status: "in-progress",
    },
    {
      id: "3",
      title: "Fase 3: Integraciones",
      description: "Integración con servicios externos",
      startDate: "2025-12-20",
      endDate: "2026-01-10",
      progress: 0,
      status: "planning",
    },
  ]);

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "doing").length;
    const pending = tasks.filter((t) => t.status === "todo").length;
    const highPriority = tasks.filter((t) => t.priority === "high").length;

    return { total, completed, inProgress, pending, highPriority };
  };

  const handleTaskAdd = (task: ProjectTask) => {
    setTasks([...tasks, task]);
  };

  const handleTaskUpdate = (updatedTask: ProjectTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Actividades y Flujo del Proyecto
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona tu proyecto usando metodología Kanban simplificada
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">tareas en total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((stats.completed / stats.total) * 100)}% completadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">En Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
              <p className="text-xs text-gray-500 mt-1">en desarrollo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">por empezar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Alta Prioridad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.highPriority}</div>
              <p className="text-xs text-gray-500 mt-1">urgentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Tablero Kanban
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Cronograma
            </TabsTrigger>
            <TabsTrigger value="methodology" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Metodología
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            <KanbanBoard
              tasks={tasks}
              onTaskAdd={handleTaskAdd}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
            />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <ProjectTimeline milestones={milestones} />
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <MethodologyInfo />

            {/* Integration Note */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Integración con Trello
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Las tareas creadas aquí pueden integrarse con Trello para sincronización
                  automática. Para activar esta función:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Ir a la sección de Trello</li>
                  <li>Conectar tu cuenta de Trello</li>
                  <li>Seleccionar el tablero de Trello a sincronizar</li>
                  <li>Las tareas se sincronizarán automáticamente</li>
                </ol>
                <div className="pt-4">
                  <Button variant="outline" className="gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Configurar Integración Trello
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectFlow;
