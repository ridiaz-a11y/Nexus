// Configuración para Google APIs

export const GOOGLE_CONFIG = {
  // Scopes necesarios para las APIs
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  
  // URLs de las APIs
  driveApiUrl: "https://www.googleapis.com/drive/v3",
  calendarApiUrl: "https://www.googleapis.com/calendar/v3",
  
  // Configuración de autenticación
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
  
  // Configuración de permisos por defecto
  defaultPermissions: {
    drive: {
      role: "reader" as const,
      type: "user" as const,
    },
    calendar: {
      sendUpdates: "all" as const,
    },
  },
};

// Helper para obtener API keys desde variables de entorno
export const getGoogleApiKeys = () => {
  return {
    driveApiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || "",
    calendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || "",
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  };
};

