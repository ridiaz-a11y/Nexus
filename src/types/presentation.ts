// Tipos para Presentaciones
export interface Presentation {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
  theme: PresentationTheme;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface Slide {
  id: string;
  title?: string;
  content: SlideContent[];
  layout: SlideLayout;
  background?: string;
  notes?: string;
}

export interface SlideContent {
  id: string;
  type: "text" | "image" | "video" | "chart" | "shape" | "table";
  position: { x: number; y: number; width: number; height: number };
  data: any;
  style?: Record<string, any>;
}

export type SlideLayout =
  | "title"
  | "title_and_content"
  | "section_header"
  | "two_content"
  | "comparison"
  | "title_only"
  | "blank"
  | "content_with_caption"
  | "picture_with_caption";

export type PresentationTheme =
  | "default"
  | "modern"
  | "minimal"
  | "corporate"
  | "creative"
  | "dark";

