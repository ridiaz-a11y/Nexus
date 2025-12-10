import { useState } from "react";
import { DrivePermission } from "@/types/drive";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserPlus, Shield, Lock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PermissionManagerProps {
  permissions: DrivePermission[];
  onAddPermission: (email: string, role: DrivePermission["role"]) => Promise<void>;
  onUpdatePermission: (permissionId: string, role: DrivePermission["role"]) => Promise<void>;
  onDeletePermission: (permissionId: string) => Promise<void>;
  onSetPrivacy: (visibility: "private" | "shared" | "public") => Promise<void>;
  currentPrivacy?: "private" | "shared" | "public";
}

export const PermissionManager = ({
  permissions,
  onAddPermission,
  onUpdatePermission,
  onDeletePermission,
  onSetPrivacy,
  currentPrivacy = "private",
}: PermissionManagerProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<DrivePermission["role"]>("reader");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPermission = async () => {
    if (!email) return;
    await onAddPermission(email, role);
    setEmail("");
    setIsDialogOpen(false);
  };

  const getRoleBadgeVariant = (role: DrivePermission["role"]) => {
    switch (role) {
      case "owner":
        return "default";
      case "writer":
        return "secondary";
      case "commenter":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "private":
        return <Lock className="h-4 w-4" />;
      case "shared":
        return <Users className="h-4 w-4" />;
      case "public":
        return <Shield className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Permisos y Privacidad
        </CardTitle>
        <CardDescription>
          Gestiona quién puede acceder y qué puede hacer con este archivo o carpeta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuración de privacidad */}
        <div className="space-y-2">
          <Label>Visibilidad</Label>
          <div className="flex gap-2">
            {(["private", "shared", "public"] as const).map((privacy) => (
              <Button
                key={privacy}
                variant={currentPrivacy === privacy ? "default" : "outline"}
                size="sm"
                onClick={() => onSetPrivacy(privacy)}
                className="flex items-center gap-2"
              >
                {getPrivacyIcon(privacy)}
                {privacy === "private" ? "Privado" : privacy === "shared" ? "Compartido" : "Público"}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de permisos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Permisos de acceso</Label>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Agregar permiso
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar permiso</DialogTitle>
                  <DialogDescription>
                    Comparte este archivo o carpeta con otra persona
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select value={role} onValueChange={(value) => setRole(value as DrivePermission["role"])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reader">Lector</SelectItem>
                        <SelectItem value="commenter">Comentarista</SelectItem>
                        <SelectItem value="writer">Editor</SelectItem>
                        <SelectItem value="organizer">Organizador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddPermission}>Agregar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            {permissions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay permisos configurados
              </p>
            ) : (
              permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        {permission.displayName || permission.emailAddress || "Usuario"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {permission.type === "user" ? "Usuario" : permission.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={permission.role}
                      onValueChange={(value) =>
                        onUpdatePermission(permission.id, value as DrivePermission["role"])
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reader">Lector</SelectItem>
                        <SelectItem value="commenter">Comentarista</SelectItem>
                        <SelectItem value="writer">Editor</SelectItem>
                        <SelectItem value="organizer">Organizador</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeletePermission(permission.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

