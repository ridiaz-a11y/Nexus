import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const MethodologyInfo = () => {
  const stages = [
    {
      name: "To Do",
      description: "Tareas planificadas y pendientes de empezar",
      color: "bg-gray-100 border-gray-300",
      icon: "📋",
    },
    {
      name: "Doing",
      description: "Tareas en progreso actualmente",
      color: "bg-blue-100 border-blue-300",
      icon: "⚙️",
    },
    {
      name: "Review",
      description: "Tareas en revisión antes de completar",
      color: "bg-yellow-100 border-yellow-300",
      icon: "🔍",
    },
    {
      name: "Done",
      description: "Tareas completadas y verificadas",
      color: "bg-green-100 border-green-300",
      icon: "✅",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Metodología de Trabajo</h2>
        <p className="text-gray-600">
          Sistema Kanban simplificado para gestión eficiente de tareas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex items-start gap-4">
            <Card className={`flex-1 border-2 ${stage.color}`}>
              <CardHeader className="pb-3">
                <div className="text-3xl mb-2">{stage.icon}</div>
                <CardTitle className="text-lg">{stage.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {stage.description}
                </CardDescription>
              </CardContent>
            </Card>
            {index < stages.length - 1 && (
              <ArrowRight className="w-5 h-5 text-gray-400 mt-6 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">Cómo funciona</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="font-semibold text-blue-600 min-w-6">1.</span>
            <p>
              <strong>Crear</strong> nuevas tareas en la columna "To Do"
            </p>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-blue-600 min-w-6">2.</span>
            <p>
              <strong>Mover</strong> tareas a "Doing" cuando empieces a trabajar en ellas
            </p>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-blue-600 min-w-6">3.</span>
            <p>
              <strong>Revisar</strong> el trabajo moviendo a la columna "Review"
            </p>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-blue-600 min-w-6">4.</span>
            <p>
              <strong>Completar</strong> las tareas moviendo a "Done" cuando esté todo validado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
