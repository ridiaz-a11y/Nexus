import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProjectMilestone } from "@/types/projectflow";
import { Calendar, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface ProjectTimelineProps {
  milestones: ProjectMilestone[];
  onMilestoneAdd?: () => void;
}

export const ProjectTimeline = ({ milestones }: ProjectTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "in-progress":
        return <AlertCircle className="w-6 h-6 text-blue-500" />;
      case "planning":
        return <Circle className="w-6 h-6 text-gray-400" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>;
      case "planning":
        return <Badge className="bg-gray-100 text-gray-800">Planificación</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Planificación</Badge>;
    }
  };

  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Cronograma del Proyecto</h2>
      </div>

      <div className="relative">
        <div className="space-y-8">
          {sortedMilestones.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay hitos planificados aún</p>
              </CardContent>
            </Card>
          ) : (
            sortedMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(milestone.status)}
                    {index !== sortedMilestones.length - 1 && (
                      <div className="w-1 h-16 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{milestone.title}</CardTitle>
                          {getStatusBadge(milestone.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(milestone.startDate).toLocaleDateString("es-ES")} -
                            {new Date(milestone.endDate).toLocaleDateString("es-ES")}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {milestone.description && (
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        )}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Progreso</span>
                            <span className="text-gray-600">{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
