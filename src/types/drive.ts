// Tipos para Google Drive
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  permissions?: DrivePermission[];
  parents?: string[];
  shared?: boolean;
}

export interface DriveFolder extends DriveFile {
  mimeType: "application/vnd.google-apps.folder";
}

export interface DrivePermission {
  id: string;
  type: "user" | "group" | "domain" | "anyone";
  role: "owner" | "organizer" | "fileOrganizer" | "writer" | "commenter" | "reader";
  emailAddress?: string;
  displayName?: string;
}

export interface FolderStructure {
  id: string;
  name: string;
  path: string;
  children: FolderStructure[];
  permissions: DrivePermission[];
}

export interface NamingRule {
  id: string;
  name: string;
  pattern: string;
  description: string;
  required: boolean;
  example: string;
}

