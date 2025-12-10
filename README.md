# 🚀 Project Nexus

**Plataforma integral de gestión colaborativa** que integra las herramientas más populares de productividad en un solo lugar, permitiendo gestionar proyectos, documentos, calendarios y presentaciones de manera eficiente y organizada.

![Project Nexus](https://img.shields.io/badge/Project-Nexus-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Propósito](#-propósito)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [Desarrollo](#-desarrollo)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

- [Comunicación sincrónica](#-comunicación-sincrónica)

## 🎯 Descripción

Project Nexus es una aplicación web moderna que centraliza múltiples herramientas de productividad en una interfaz unificada. Diseñada para equipos y profesionales que necesitan gestionar proyectos, documentos, eventos y presentaciones de manera eficiente, sin tener que cambiar entre diferentes plataformas.

## 🎯 Propósito

### ¿Para qué se utiliza Project Nexus?

Project Nexus está diseñado para:

1. **Centralizar la gestión de proyectos**: Unifica herramientas como Trello, Notion, Google Drive y Calendar en una sola plataforma
2. **Mejorar la productividad del equipo**: Reduce el tiempo perdido cambiando entre diferentes aplicaciones
3. **Organizar información**: Proporciona estructuras consistentes para archivos, documentos y eventos
4. **Facilitar la colaboración**: Permite gestionar permisos y compartir recursos de manera segura
5. **Gestionar el tiempo**: Integra calendarios y recordatorios para mantener a los equipos sincronizados

### Casos de Uso

- **Equipos de desarrollo**: Gestionar sprints, documentación técnica y reuniones
- **Equipos de marketing**: Organizar campañas, contenido y presentaciones
- **Estudiantes y educadores**: Gestionar proyectos académicos, notas y calendarios
- **Freelancers**: Organizar clientes, proyectos y entregables
- **Startups**: Centralizar toda la gestión del negocio en un solo lugar

## ✨ Características Principales

### 🔵 Google Drive - Almacenamiento Colaborativo

- **Estructura de carpetas**: Organiza archivos con jerarquías claras y navegación intuitiva
- **Normas de nombrado**: Sistema de validación para mantener consistencia en nombres de archivos
- **Permisos y privacidad**: Gestión granular de acceso con roles personalizables
- **Vista de árbol**: Navegación visual de la estructura de carpetas

### 📅 Google Calendar - Gestión del Tiempo

- **Eventos y reuniones**: Crea y gestiona eventos con detalles completos
- **Fechas límite**: Sistema de deadlines con prioridades (alta, media, baja)
- **Recordatorios**: Notificaciones personalizables por evento
- **Vista semanal**: Visualización organizada de eventos próximos
- **Búsqueda**: Encuentra eventos rápidamente

### 📊 Trello - Gestión de Proyectos Kanban

- **Tableros**: Crea múltiples tableros para diferentes proyectos
- **Listas**: Organiza tareas en columnas personalizables
- **Tarjetas**: Gestiona tareas con descripciones, fechas y etiquetas
- **Vista Kanban**: Interfaz visual tipo tablero para seguimiento de progreso

### 📝 Notion - Documentos y Conocimiento

- **Páginas**: Crea documentos ilimitados con editor flexible
- **Bloques**: Sistema modular de contenido (títulos, párrafos, listas, código, citas)
- **Editor en tiempo real**: Edición inline con preview instantáneo
- **Organización**: Sidebar con lista de todas las páginas

### 🎨 Presentaciones - Creador de Slides

- **Editor de diapositivas**: Crea presentaciones profesionales
- **Múltiples temas**: Estilos predefinidos (moderno, minimalista, corporativo, etc.)
- **Vista de miniaturas**: Navegación rápida entre diapositivas
- **Modo edición/vista previa**: Alterna entre edición y presentación
- **Gestión de contenido**: Agrega texto, imágenes y elementos visuales

### 🎨 Interfaz Moderna

- **Navbar responsive**: Navegación adaptativa con menú móvil
- **Diseño moderno**: UI/UX profesional con animaciones suaves
- **Tema oscuro/claro**: Soporte para preferencias de tema
- **Componentes reutilizables**: Biblioteca completa de componentes UI

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18.3.1**: Biblioteca de UI moderna y eficiente
- **TypeScript 5.8.3**: Tipado estático para mayor robustez
- **Vite 5.4.19**: Build tool rápido y optimizado
- **React Router 6.30.1**: Navegación entre páginas
- **Tailwind CSS 3.4.17**: Framework de utilidades CSS
- **shadcn/ui**: Componentes UI accesibles y personalizables

### Librerías Principales

- **@tanstack/react-query 5.83.0**: Gestión de estado del servidor
- **date-fns 3.6.0**: Manipulación de fechas
- **lucide-react 0.462.0**: Iconos modernos
- **sonner 1.7.4**: Sistema de notificaciones
- **react-hook-form 7.61.1**: Gestión de formularios
- **zod 3.25.76**: Validación de esquemas

### Herramientas de Desarrollo

- **ESLint**: Linting de código
- **TypeScript ESLint**: Reglas específicas para TypeScript
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad de navegadores

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm, pnpm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/ridiaz-a11y/Nexus.git
cd Nexus
```

2. **Instalar dependencias**

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. **Configurar variables de entorno** (opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_GOOGLE_DRIVE_API_KEY=tu_api_key_aqui
VITE_GOOGLE_CALENDAR_API_KEY=tu_api_key_aqui
VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8080`

## 🚀 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Calidad de código
npm run lint         # Ejecuta el linter
```

### Navegación

1. **Inicio**: Página principal con acceso a todas las funcionalidades
2. **Drive**: Gestiona archivos y carpetas de Google Drive
3. **Calendar**: Administra eventos, reuniones y fechas límite
4. **Trello**: Crea y gestiona tableros Kanban
5. **Notion**: Crea y edita documentos
6. **Presentaciones**: Diseña presentaciones profesionales

## 📁 Estructura del Proyecto

```
project-nexus-main/
├── public/                 # Archivos estáticos
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/         # Componentes React
│   │   ├── calendar/      # Componentes de Calendar
│   │   ├── drive/         # Componentes de Drive
│   │   ├── layout/        # Layout components (Navbar)
│   │   └── ui/            # Componentes UI de shadcn
│   ├── config/            # Configuraciones
│   │   └── google.config.ts
│   ├── constants/         # Constantes
│   │   └── naming-rules.ts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Index.tsx
│   │   ├── Drive.tsx
│   │   ├── Calendar.tsx
│   │   ├── Trello.tsx
│   │   ├── Notion.tsx
│   │   └── Presentations.tsx
│   ├── services/          # Servicios de API
│   │   ├── google-drive.service.ts
│   │   └── google-calendar.service.ts
│   ├── types/             # Definiciones TypeScript
│   │   ├── drive.ts
│   │   ├── calendar.ts
│   │   ├── trello.ts
│   │   ├── notion.ts
│   │   └── presentation.ts
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🔧 Funcionalidades Detalladas

### Google Drive

- ✅ Visualización de estructura de carpetas en árbol
- ✅ Creación de carpetas con validación de nombres
- ✅ Gestión de permisos (lector, editor, organizador)
- ✅ Configuración de privacidad (privado, compartido, público)
- ✅ Normas de nombrado personalizables
- ✅ Búsqueda de archivos

### Google Calendar

- ✅ Creación de eventos con fecha y hora
- ✅ Eventos de todo el día
- ✅ Fechas límite con sistema de prioridades
- ✅ Reuniones con participantes
- ✅ Recordatorios personalizables
- ✅ Vista de eventos próximos
- ✅ Búsqueda de eventos

### Trello

- ✅ Creación de tableros ilimitados
- ✅ Listas personalizables (Por hacer, En progreso, Completado, etc.)
- ✅ Tarjetas con descripciones y fechas
- ✅ Etiquetas y miembros
- ✅ Vista Kanban interactiva
- ✅ Drag and drop (próximamente)

### Notion

- ✅ Editor de bloques flexible
- ✅ Tipos de contenido: títulos, párrafos, listas, código, citas
- ✅ Edición inline
- ✅ Múltiples páginas
- ✅ Organización por sidebar

### Presentaciones

- ✅ Creación de presentaciones
- ✅ Múltiples diapositivas
- ✅ Temas predefinidos
- ✅ Vista de miniaturas
- ✅ Modo edición y vista previa
- ✅ Navegación entre diapositivas

## 💻 Desarrollo

### Configuración del Entorno

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

### Estructura de Commits

Seguimos el estándar de commits convencionales:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Próximas Mejoras

- [ ] Integración real con APIs de Google
- [ ] Autenticación OAuth
- [ ] Persistencia de datos
- [ ] Sincronización en tiempo real
- [ ] Drag and drop en Trello
- [ ] Exportación de presentaciones
- [ ] Modo colaborativo en tiempo real
- [ ] Notificaciones push
- [ ] Temas personalizables

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que todos los tests pasen

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **ridiaz-a11y** - [GitHub](https://github.com/ridiaz-a11y)

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes UI
- [Vite](https://vitejs.dev/) por el build tool
- [React](https://react.dev/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño

## 📞 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!

## 🗣️ Comunicación sincrónica

Se han añadido las pautas y reglas para reuniones en tiempo real (Zoom / Google Meet) en `docs/comunicacion_sincronica.md`. El documento incluye lineamientos de preparación, accesibilidad, frecuencias recomendadas y reglas de interacción. Revisar ese archivo para instrucciones y plantillas de convocatoria/acta.
