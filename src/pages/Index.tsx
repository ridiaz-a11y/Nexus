import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Folder,
  Calendar,
  Shield,
  FileText,
  Clock,
  Users,
  ArrowRight,
  Columns,
  Presentation,
} from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Project Nexus</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plataforma de gestión colaborativa con integración de Google Drive y Google Calendar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {/* Google Drive Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Google Drive</CardTitle>
                <CardDescription>Almacenamiento colaborativo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Estructura de carpetas organizada
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Gestión de permisos y privacidad
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Normas de nombrado consistentes
              </li>
            </ul>
            <Link to="/drive">
              <Button className="w-full flex items-center justify-between group">
                <span>Gestionar Drive</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Google Calendar Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Google Calendar</CardTitle>
                <CardDescription>Gestión del tiempo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos y reuniones
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Fechas límite con prioridades
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Recordatorios personalizados
              </li>
            </ul>
            <Link to="/calendar">
              <Button className="w-full flex items-center justify-between group">
                <span>Gestionar Calendar</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Trello Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Columns className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Trello</CardTitle>
                <CardDescription>Gestión de proyectos Kanban</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Columns className="h-4 w-4" />
                Tableros y listas
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tarjetas y tareas
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Colaboración en equipo
              </li>
            </ul>
            <Link to="/trello">
              <Button className="w-full flex items-center justify-between group">
                <span>Gestionar Trello</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notion Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Notion</CardTitle>
                <CardDescription>Documentos y conocimiento</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Páginas y bloques
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Editor flexible
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Organización de contenido
              </li>
            </ul>
            <Link to="/notion">
              <Button className="w-full flex items-center justify-between group">
                <span>Gestionar Notion</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Presentaciones Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Presentation className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Presentaciones</CardTitle>
                <CardDescription>Crear presentaciones profesionales</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Presentation className="h-4 w-4" />
                Editor de diapositivas
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Múltiples temas
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Vista previa y edición
              </li>
            </ul>
            <Link to="/presentations">
              <Button className="w-full flex items-center justify-between group">
                <span>Crear Presentación</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Características Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Organización</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mantén tus archivos y eventos organizados con estructuras profesionales y
                normas consistentes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Colaboración</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestiona permisos y comparte recursos de manera segura con tu equipo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Productividad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimiza tu tiempo con recordatorios inteligentes y seguimiento de fechas límite.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
