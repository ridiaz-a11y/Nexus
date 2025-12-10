import { NamingRule } from "@/types/drive";

// Normas de nombrado para archivos y carpetas
export const DEFAULT_NAMING_RULES: NamingRule[] = [
  {
    id: "1",
    name: "Formato de fecha",
    pattern: "YYYY-MM-DD",
    description: "Usar formato de fecha ISO (YYYY-MM-DD) al inicio de nombres de archivos",
    required: true,
    example: "2024-01-15_Informe_Proyecto.pdf",
  },
  {
    id: "2",
    name: "Sin espacios",
    pattern: "[A-Za-z0-9_-]+",
    description: "Usar guiones bajos o guiones en lugar de espacios",
    required: true,
    example: "Informe_Proyecto_Nexus.pdf",
  },
  {
    id: "3",
    name: "Versiones",
    pattern: "_v[0-9]+",
    description: "Incluir versión al final del nombre antes de la extensión",
    required: false,
    example: "Documento_v2.pdf",
  },
  {
    id: "4",
    name: "Categorías",
    pattern: "\\[CATEGORIA\\]",
    description: "Usar corchetes para categorías o etiquetas",
    required: false,
    example: "[Diseño]_Mockup_Final.png",
  },
];

export const FOLDER_STRUCTURE_TEMPLATES = {
  project: {
    name: "Estructura de Proyecto",
    folders: [
      "01_Documentacion",
      "02_Diseño",
      "03_Desarrollo",
      "04_Pruebas",
      "05_Despliegue",
    ],
  },
  team: {
    name: "Estructura de Equipo",
    folders: [
      "Recursos_Compartidos",
      "Templates",
      "Archivos_Temporales",
      "Documentos_Importantes",
    ],
  },
  client: {
    name: "Estructura de Cliente",
    folders: [
      "Contratos",
      "Facturacion",
      "Comunicaciones",
      "Entregables",
    ],
  },
};

