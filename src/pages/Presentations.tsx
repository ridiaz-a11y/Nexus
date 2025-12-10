import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Presentation, Slide, PresentationTheme } from "@/types/presentation";
import {
  Plus,
  Presentation as PresentationIcon,
  FileText,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Presentations = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [newPresentationTitle, setNewPresentationTitle] = useState("");
  const [isPresentationDialogOpen, setIsPresentationDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCreatePresentation = () => {
    if (!newPresentationTitle.trim()) {
      toast.error("El título de la presentación no puede estar vacío");
      return;
    }

    const newPresentation: Presentation = {
      id: `presentation_${Date.now()}`,
      title: newPresentationTitle,
      slides: [
        {
          id: `slide_${Date.now()}`,
          layout: "title",
          content: [
            {
              id: `content_${Date.now()}`,
              type: "text",
              position: { x: 0, y: 0, width: 100, height: 20 },
              data: { text: newPresentationTitle },
            },
          ],
        },
      ],
      theme: "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: "Usuario",
    };

    setPresentations([...presentations, newPresentation]);
    setSelectedPresentation(newPresentation);
    setNewPresentationTitle("");
    setIsPresentationDialogOpen(false);
    setIsEditMode(true);
    toast.success(`Presentación "${newPresentation.title}" creada exitosamente`);
  };

  const handleAddSlide = () => {
    if (!selectedPresentation) return;

    const newSlide: Slide = {
      id: `slide_${Date.now()}`,
      layout: "title_and_content",
      content: [
        {
          id: `content_${Date.now()}`,
          type: "text",
          position: { x: 10, y: 10, width: 80, height: 10 },
          data: { text: "Nueva diapositiva" },
        },
      ],
    };

    const updatedPresentation = {
      ...selectedPresentation,
      slides: [...selectedPresentation.slides, newSlide],
      updatedAt: new Date().toISOString(),
    };

    setSelectedPresentation(updatedPresentation);
    setPresentations(
      presentations.map((p) => (p.id === selectedPresentation.id ? updatedPresentation : p))
    );
    setCurrentSlideIndex(updatedPresentation.slides.length - 1);
    toast.success("Diapositiva agregada");
  };

  const handleDeleteSlide = (slideId: string) => {
    if (!selectedPresentation) return;

    const updatedSlides = selectedPresentation.slides.filter((s) => s.id !== slideId);
    const updatedPresentation = {
      ...selectedPresentation,
      slides: updatedSlides,
      updatedAt: new Date().toISOString(),
    };

    setSelectedPresentation(updatedPresentation);
    setPresentations(
      presentations.map((p) => (p.id === selectedPresentation.id ? updatedPresentation : p))
    );

    if (currentSlideIndex >= updatedSlides.length) {
      setCurrentSlideIndex(Math.max(0, updatedSlides.length - 1));
    }

    toast.success("Diapositiva eliminada");
  };

  const currentSlide = selectedPresentation?.slides[currentSlideIndex];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Presentaciones</h1>
          <p className="text-muted-foreground">Crea y gestiona presentaciones profesionales</p>
        </div>
        <Dialog open={isPresentationDialogOpen} onOpenChange={setIsPresentationDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Presentación
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Presentación</DialogTitle>
              <DialogDescription>
                Crea una nueva presentación desde cero
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="presentationTitle" className="text-sm font-medium">
                  Título de la Presentación
                </label>
                <Input
                  id="presentationTitle"
                  value={newPresentationTitle}
                  onChange={(e) => setNewPresentationTitle(e.target.value)}
                  placeholder="Mi Presentación"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreatePresentation();
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="theme" className="text-sm font-medium">
                  Tema
                </label>
                <Select
                  defaultValue="default"
                  onValueChange={(value) => {
                    // Se puede usar para establecer el tema por defecto
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Por Defecto</SelectItem>
                    <SelectItem value="modern">Moderno</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                    <SelectItem value="corporate">Corporativo</SelectItem>
                    <SelectItem value="creative">Creativo</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPresentationDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreatePresentation}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {presentations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <PresentationIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              No hay presentaciones creadas. Crea tu primera presentación para comenzar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {!selectedPresentation ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presentations.map((presentation) => (
                <Card
                  key={presentation.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedPresentation(presentation);
                    setCurrentSlideIndex(0);
                    setIsEditMode(false);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PresentationIcon className="h-5 w-5" />
                      {presentation.title}
                    </CardTitle>
                    <CardDescription>
                      {presentation.slides.length} diapositiva(s) •{" "}
                      {format(new Date(presentation.updatedAt), "PPP", { locale: es })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header de la presentación */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPresentation.title}</h2>
                  <p className="text-muted-foreground">
                    Diapositiva {currentSlideIndex + 1} de {selectedPresentation.slides.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPresentation(null);
                      setIsEditMode(false);
                      setCurrentSlideIndex(0);
                    }}
                  >
                    Volver
                  </Button>
                  <Button
                    variant={isEditMode ? "default" : "outline"}
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditMode ? "Vista Previa" : "Editar"}
                  </Button>
                  <Button onClick={handleAddSlide}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Diapositiva
                  </Button>
                </div>
              </div>

              {/* Vista de la presentación */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Miniaturas de diapositivas */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Diapositivas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                      {selectedPresentation.slides.map((slide, index) => (
                        <div
                          key={slide.id}
                          className={`p-2 border rounded-md cursor-pointer transition-colors ${
                            index === currentSlideIndex
                              ? "border-primary bg-accent"
                              : "hover:bg-accent/50"
                          }`}
                          onClick={() => setCurrentSlideIndex(index)}
                        >
                          <div className="aspect-video bg-muted rounded flex items-center justify-center mb-2">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-center">
                            {index + 1}
                            {isEditMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 ml-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSlide(slide.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            )}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Editor/Vista de diapositiva */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardContent className="p-8">
                      {currentSlide ? (
                        <div className="space-y-4">
                          {/* Controles de navegación */}
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))
                              }
                              disabled={currentSlideIndex === 0}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              Anterior
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setCurrentSlideIndex(
                                  Math.min(
                                    selectedPresentation.slides.length - 1,
                                    currentSlideIndex + 1
                                  )
                                )
                              }
                              disabled={currentSlideIndex === selectedPresentation.slides.length - 1}
                            >
                              Siguiente
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Vista de la diapositiva */}
                          <div className="aspect-video bg-background border-2 border-muted rounded-lg p-8 flex items-center justify-center">
                            {isEditMode ? (
                              <div className="w-full h-full space-y-4">
                                {currentSlide.content.map((content) => (
                                  <div
                                    key={content.id}
                                    className="p-4 border-2 border-dashed border-muted rounded"
                                  >
                                    {content.type === "text" && (
                                      <Textarea
                                        value={content.data.text || ""}
                                        onChange={(e) => {
                                          // Actualizar contenido
                                        }}
                                        placeholder="Escribe aquí..."
                                        className="min-h-[100px]"
                                      />
                                    )}
                                  </div>
                                ))}
                                {currentSlide.content.length === 0 && (
                                  <div className="text-center text-muted-foreground">
                                    <p>Agrega contenido a esta diapositiva</p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-center">
                                {currentSlide.content.map((content) => (
                                  <div key={content.id} className="mb-4">
                                    {content.type === "text" && (
                                      <h2 className="text-2xl font-bold">
                                        {content.data.text || "Título de la diapositiva"}
                                      </h2>
                                    )}
                                  </div>
                                ))}
                                {currentSlide.content.length === 0 && (
                                  <p className="text-muted-foreground">Diapositiva vacía</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No hay diapositivas en esta presentación</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Presentations;

