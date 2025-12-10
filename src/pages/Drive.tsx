import { useState, useEffect } from "react";
import { FolderStructure, DrivePermission, NamingRule } from "@/types/drive";
import { getDriveService } from "@/services/google-drive.service";
import { DEFAULT_NAMING_RULES } from "@/constants/naming-rules";
import { FolderTree } from "@/components/drive/FolderTree";
import { PermissionManager } from "@/components/drive/PermissionManager";
import { NamingRulesManager } from "@/components/drive/NamingRulesManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderPlus, Search, Folder } from "lucide-react";
import { toast } from "sonner";

const Drive = () => {
  const [folderStructure, setFolderStructure] = useState<FolderStructure | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderStructure | null>(null);
  const [permissions, setPermissions] = useState<DrivePermission[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const driveService = getDriveService();

  useEffect(() => {
    loadFolderStructure();
  }, []);

  const loadFolderStructure = async () => {
    try {
      const structure = await driveService.getFolderStructure("root");
      setFolderStructure(structure);
      setSelectedFolder(structure);
      if (structure.permissions) {
        setPermissions(structure.permissions);
      }
    } catch (error) {
      toast.error("Error al cargar la estructura de carpetas");
      console.error(error);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("El nombre de la carpeta no puede estar vacío");
      return;
    }

    try {
      driveService.validateFileName(newFolderName);
      const parentId = selectedFolder?.id || "root";
      const newFolder = await driveService.createFolder(newFolderName, parentId);
      toast.success(`Carpeta "${newFolder.name}" creada exitosamente`);
      setNewFolderName("");
      setIsCreateDialogOpen(false);
      await loadFolderStructure();
    } catch (error: any) {
      toast.error(error.message || "Error al crear la carpeta");
    }
  };

  const handleFolderSelect = async (folder: FolderStructure) => {
    setSelectedFolder(folder);
    try {
      const folderPerms = await driveService.getPermissions(folder.id);
      setPermissions(folderPerms);
    } catch (error) {
      toast.error("Error al cargar permisos");
    }
  };

  const handleAddPermission = async (email: string, role: DrivePermission["role"]) => {
    if (!selectedFolder) return;
    try {
      const permission = await driveService.shareFile(selectedFolder.id, email, role);
      setPermissions([...permissions, permission]);
      toast.success("Permiso agregado exitosamente");
    } catch (error) {
      toast.error("Error al agregar permiso");
    }
  };

  const handleUpdatePermission = async (
    permissionId: string,
    role: DrivePermission["role"]
  ) => {
    if (!selectedFolder) return;
    try {
      await driveService.updatePermission(selectedFolder.id, permissionId, role);
      setPermissions(
        permissions.map((p) => (p.id === permissionId ? { ...p, role } : p))
      );
      toast.success("Permiso actualizado");
    } catch (error) {
      toast.error("Error al actualizar permiso");
    }
  };

  const handleDeletePermission = async (permissionId: string) => {
    if (!selectedFolder) return;
    try {
      await driveService.deletePermission(selectedFolder.id, permissionId);
      setPermissions(permissions.filter((p) => p.id !== permissionId));
      toast.success("Permiso eliminado");
    } catch (error) {
      toast.error("Error al eliminar permiso");
    }
  };

  const handleSetPrivacy = async (visibility: "private" | "shared" | "public") => {
    if (!selectedFolder) return;
    try {
      await driveService.setPrivacy(selectedFolder.id, visibility);
      toast.success(`Visibilidad cambiada a ${visibility}`);
    } catch (error) {
      toast.error("Error al cambiar visibilidad");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Google Drive</h1>
          <p className="text-muted-foreground">
            Gestión de almacenamiento colaborativo
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Nueva Carpeta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Carpeta</DialogTitle>
              <DialogDescription>
                Ingresa el nombre de la nueva carpeta. Se validará según las normas de nombrado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="folderName">Nombre de la carpeta</Label>
                <Input
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Ej: 2024-01-15_Proyecto_Nexus"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateFolder();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateFolder}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structure">Estructura de Carpetas</TabsTrigger>
          <TabsTrigger value="naming">Normas de Nombrado</TabsTrigger>
          <TabsTrigger value="permissions">Permisos y Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Carpetas
                </CardTitle>
                <CardDescription>
                  Navega por la estructura de carpetas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {folderStructure ? (
                  <FolderTree
                    structure={folderStructure}
                    onFolderSelect={handleFolderSelect}
                    selectedFolderId={selectedFolder?.id}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">Cargando...</p>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detalles de la Carpeta</CardTitle>
                <CardDescription>
                  {selectedFolder
                    ? `Información de: ${selectedFolder.name}`
                    : "Selecciona una carpeta para ver sus detalles"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedFolder ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Ruta:</p>
                      <p className="text-sm text-muted-foreground">{selectedFolder.path}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">ID:</p>
                      <p className="text-sm text-muted-foreground font-mono">{selectedFolder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Permisos:</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFolder.permissions.length} permiso(s) configurado(s)
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Selecciona una carpeta del árbol para ver sus detalles
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="naming">
          <NamingRulesManager rules={DEFAULT_NAMING_RULES} />
        </TabsContent>

        <TabsContent value="permissions">
          {selectedFolder ? (
            <PermissionManager
              permissions={permissions}
              onAddPermission={handleAddPermission}
              onUpdatePermission={handleUpdatePermission}
              onDeletePermission={handleDeletePermission}
              onSetPrivacy={handleSetPrivacy}
            />
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  Selecciona una carpeta para gestionar sus permisos
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Drive;

