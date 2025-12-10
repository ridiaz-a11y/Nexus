// Tipos para Notion
export interface NotionPage {
  id: string;
  title: string;
  icon?: string;
  cover?: string;
  createdAt: string;
  updatedAt: string;
  blocks: NotionBlock[];
  properties: NotionProperty[];
}

export interface NotionBlock {
  id: string;
  type: NotionBlockType;
  content: string;
  children?: NotionBlock[];
  properties?: Record<string, any>;
}

export type NotionBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "quote"
  | "code"
  | "callout"
  | "divider"
  | "image"
  | "video"
  | "file"
  | "table"
  | "database";

export interface NotionProperty {
  id: string;
  name: string;
  type: "title" | "rich_text" | "number" | "select" | "multi_select" | "date" | "person" | "files" | "checkbox" | "url" | "email" | "phone_number";
  value: any;
}

export interface NotionDatabase {
  id: string;
  title: string;
  properties: NotionProperty[];
  pages: NotionPage[];
}

