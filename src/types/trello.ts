// Tipos para Trello
export interface TrelloBoard {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  lists: TrelloList[];
}

export interface TrelloList {
  id: string;
  name: string;
  position: number;
  cards: TrelloCard[];
}

export interface TrelloCard {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
  labels: TrelloLabel[];
  members: TrelloMember[];
  position: number;
  cover?: string;
  attachments: TrelloAttachment[];
  comments: TrelloComment[];
  checklist?: TrelloChecklist[];
}

export interface TrelloLabel {
  id: string;
  name: string;
  color: string;
}

export interface TrelloMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface TrelloAttachment {
  id: string;
  name: string;
  url: string;
  type: "image" | "file" | "link";
}

export interface TrelloComment {
  id: string;
  text: string;
  author: TrelloMember;
  createdAt: string;
}

export interface TrelloChecklist {
  id: string;
  name: string;
  items: TrelloChecklistItem[];
}

export interface TrelloChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

