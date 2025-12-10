export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "review" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee?: string;
  trelloId?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: "planning" | "in-progress" | "completed";
}

export interface ProjectFlow {
  id: string;
  name: string;
  description: string;
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  createdAt: string;
  updatedAt: string;
}

export type KanbanStatus = "todo" | "doing" | "review" | "done";
