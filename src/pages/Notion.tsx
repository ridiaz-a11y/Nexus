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
import { NotionPage, NotionBlock } from "@/types/notion";
import {
  Plus,
  FileText,
  Heading1,
  Heading2,
  Heading3,
  List,
  CheckSquare,
  Quote,
  Code,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Notion = () => {
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<NotionPage | null>(null);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<NotionBlock | null>(null);

  const handleCreatePage = () => {
    if (!newPageTitle.trim()) {
      toast.error("El título de la página no puede estar vacío");
      return;
    }

    const newPage: NotionPage = {
      id: `page_${Date.now()}`,
      title: newPageTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [],
      properties: [],
    };

    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setNewPageTitle("");
    setIsPageDialogOpen(false);
    toast.success(`Página "${newPage.title}" creada exitosamente`);
  };

  const handleAddBlock = (type: NotionBlock["type"]) => {
    if (!selectedPage) return;

    const newBlock: NotionBlock = {
      id: `block_${Date.now()}`,
      type,
      content: "",
    };

    const updatedPage = {
      ...selectedPage,
      blocks: [...selectedPage.blocks, newBlock],
      updatedAt: new Date().toISOString(),
    };

    setSelectedPage(updatedPage);
    setPages(pages.map((p) => (p.id === selectedPage.id ? updatedPage : p)));
    setEditingBlock(newBlock);
    toast.success("Bloque agregado");
  };

  const handleUpdateBlock = (blockId: string, content: string) => {
    if (!selectedPage) return;

    const updatedBlocks = selectedPage.blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );

    const updatedPage = {
      ...selectedPage,
      blocks: updatedBlocks,
      updatedAt: new Date().toISOString(),
    };

    setSelectedPage(updatedPage);
    setPages(pages.map((p) => (p.id === selectedPage.id ? updatedPage : p)));
  };

  const getBlockIcon = (type: NotionBlock["type"]) => {
    switch (type) {
      case "heading_1":
        return <Heading1 className="h-4 w-4" />;
      case "heading_2":
        return <Heading2 className="h-4 w-4" />;
      case "heading_3":
        return <Heading3 className="h-4 w-4" />;
      case "bulleted_list_item":
      case "numbered_list_item":
        return <List className="h-4 w-4" />;
      case "to_do":
        return <CheckSquare className="h-4 w-4" />;
      case "quote":
        return <Quote className="h-4 w-4" />;
      case "code":
        return <Code className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const renderBlock = (block: NotionBlock) => {
    const isEditing = editingBlock?.id === block.id;

    switch (block.type) {
      case "heading_1":
        return (
          <h1
            className="text-3xl font-bold mt-6 mb-4"
            onClick={() => setEditingBlock(block)}
          >
            {block.content || "Título 1"}
          </h1>
        );
      case "heading_2":
        return (
          <h2
            className="text-2xl font-semibold mt-5 mb-3"
            onClick={() => setEditingBlock(block)}
          >
            {block.content || "Título 2"}
          </h2>
        );
      case "heading_3":
        return (
          <h3
            className="text-xl font-semibold mt-4 mb-2"
            onClick={() => setEditingBlock(block)}
          >
            {block.content || "Título 3"}
          </h3>
        );
      case "paragraph":
        return (
          <p
            className="text-base my-2 min-h-[24px]"
            onClick={() => setEditingBlock(block)}
          >
            {block.content || "Escribe algo..."}
          </p>
        );
      case "bulleted_list_item":
        return (
          <li className="flex items-start gap-2 my-1">
            <span className="mt-2">•</span>
            <span
              className="flex-1 min-h-[24px]"
              onClick={() => setEditingBlock(block)}
            >
              {block.content || "Elemento de lista"}
            </span>
          </li>
        );
      case "to_do":
        return (
          <div className="flex items-start gap-2 my-2">
            <input type="checkbox" className="mt-1" />
            <span
              className="flex-1 min-h-[24px]"
              onClick={() => setEditingBlock(block)}
            >
              {block.content || "Tarea pendiente"}
            </span>
          </div>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 border-muted pl-4 my-4 italic">
            {block.content || "Cita"}
          </blockquote>
        );
      case "code":
        return (
          <pre className="bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">
            <code>{block.content || "// Código aquí"}</code>
          </pre>
        );
      default:
        return (
          <div
            className="my-2 min-h-[24px]"
            onClick={() => setEditingBlock(block)}
          >
            {block.content || "Bloque"}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notion</h1>
          <p className="text-muted-foreground">Gestión de documentos y conocimiento</p>
        </div>
        <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Página
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Página</DialogTitle>
              <DialogDescription>
                Crea un nuevo documento en Notion
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="pageTitle" className="text-sm font-medium">
                  Título de la Página
                </label>
                <Input
                  id="pageTitle"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="Mi Documento"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreatePage();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPageDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreatePage}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No hay páginas creadas. Crea tu primera página para comenzar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con lista de páginas */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Páginas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedPage?.id === page.id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedPage(page)}
                  >
                    <p className="font-medium text-sm">{page.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(page.updatedAt), "PPP", { locale: es })}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Editor principal */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{selectedPage.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddBlock("paragraph")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Bloque
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Toolbar de bloques */}
                  <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("heading_1")}
                      title="Título 1"
                    >
                      <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("heading_2")}
                      title="Título 2"
                    >
                      <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("heading_3")}
                      title="Título 3"
                    >
                      <Heading3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("paragraph")}
                      title="Párrafo"
                    >
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("bulleted_list_item")}
                      title="Lista"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("to_do")}
                      title="Tarea"
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("quote")}
                      title="Cita"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddBlock("code")}
                      title="Código"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Contenido de la página */}
                  <div className="min-h-[400px] space-y-2">
                    {selectedPage.blocks.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>Comienza agregando bloques a tu página</p>
                        <p className="text-sm mt-2">Usa los botones de arriba para agregar contenido</p>
                      </div>
                    ) : (
                      selectedPage.blocks.map((block) => (
                        <div key={block.id}>
                          {editingBlock?.id === block.id ? (
                            <Textarea
                              value={block.content}
                              onChange={(e) => handleUpdateBlock(block.id, e.target.value)}
                              onBlur={() => setEditingBlock(null)}
                              className="min-h-[100px]"
                              autoFocus
                            />
                          ) : (
                            renderBlock(block)
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Selecciona una página de la lista para editarla
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notion;

