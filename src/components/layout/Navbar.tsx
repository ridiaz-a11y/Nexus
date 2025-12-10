import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  Folder,
  Calendar,
  Home,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Sparkles,
  Columns,
  FileText,
  Presentation,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Inicio",
      href: "/",
      icon: Home,
      description: "Página principal",
    },
    {
      label: "Drive",
      href: "/drive",
      icon: Folder,
      description: "Google Drive",
    },
    {
      label: "Calendar",
      href: "/calendar",
      icon: Calendar,
      description: "Google Calendar",
    },
    {
      label: "Trello",
      href: "/trello",
      icon: Columns,
      description: "Gestión de proyectos",
    },
    {
      label: "Notion",
      href: "/notion",
      icon: FileText,
      description: "Documentos y conocimiento",
    },
    {
      label: "Presentaciones",
      href: "/presentations",
      icon: Presentation,
      description: "Crear presentaciones",
    },
  ];

  const NavLinkItem = ({
    href,
    icon: Icon,
    label,
    onClick,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
  }) => (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group overflow-hidden",
          isActive
            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 scale-105"
            : "text-muted-foreground hover:bg-gradient-to-r hover:from-accent/90 hover:to-accent/70 hover:text-accent-foreground hover:shadow-md hover:scale-105"
        )
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className={cn(
        "h-5 w-5 transition-all duration-300 relative z-10",
        "group-hover:scale-110 group-hover:rotate-3"
      )} />
      <span className="whitespace-nowrap relative z-10">{label}</span>
      {({ isActive }) => isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground/50 rounded-full" />
      )}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-gradient-to-b from-background/98 via-background/95 to-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 shadow-lg shadow-black/5">
      <div className="w-full max-w-[1920px] mx-auto px-8 xl:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo y Brand */}
          <div className="flex items-center gap-5">
            <NavLink
              to="/"
              className="flex items-center gap-4 text-xl font-bold hover:opacity-90 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/40 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <span className="hidden sm:inline-block bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent text-2xl font-extrabold tracking-tight">
                Project Nexus
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <NavLinkItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
                {index < navItems.length - 1 && (
                  <Separator orientation="vertical" className="h-8 mx-2 opacity-20" />
                )}
              </div>
            ))}
          </div>

          {/* Right Side - User Menu & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Separator */}
            <Separator orientation="vertical" className="h-10 hidden lg:block opacity-20" />
            
            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Avatar className="h-12 w-12 ring-2 ring-border/30 group-hover:ring-primary/50 transition-all duration-300 relative z-10">
                    <AvatarImage src="" alt="Usuario" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold shadow-lg">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-border/50">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">Mi Cuenta</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      usuario@ejemplo.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent/80 transition-colors">
                  <User className="mr-3 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent/80 transition-colors">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive rounded-lg px-3 py-2.5 hover:bg-destructive/10 transition-colors">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-12 w-12 hover:bg-accent/90 transition-all duration-300 hover:scale-110 rounded-xl"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[420px] bg-gradient-to-b from-background to-background/95">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-50" />
                      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl">
                        <Sparkles className="h-7 w-7" />
                      </div>
                    </div>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Project Nexus
                    </span>
                  </div>

                  <Separator className="opacity-20" />

                  <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <NavLinkItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        onClick={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </nav>

                  <Separator className="opacity-20" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-accent/30">
                      <Avatar className="h-14 w-14 ring-2 ring-border/30">
                        <AvatarImage src="" alt="Usuario" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold">
                          <User className="h-7 w-7" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">Mi Cuenta</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          usuario@ejemplo.com
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        className="justify-start w-full hover:bg-accent/90 rounded-xl h-11"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4" />
                        Perfil
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full hover:bg-accent/90 rounded-xl h-11"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Configuración
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-11"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
