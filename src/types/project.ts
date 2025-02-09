export type TProjectType = "frontend" | "backend" | "full-stack";
export type TProjectStatus = "active" | "completed" | "archived";
export type TTeckStack = {
  technologies: string[];
  deploymentLink: string;
  github: string;
};

export type TProject = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  brief: string;
  cover: string;
  likes: number;
  views: number;
  comments: number;
  features: string[];
  images: string[];
  type: TProjectType;
  status: TProjectStatus;
  frontend: TTeckStack;
  backend: TTeckStack;
  isDeleted: boolean;
};
