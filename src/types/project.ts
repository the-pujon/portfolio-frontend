export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailImage: string;
  images: string[];
  videoDemo?: string;
  liveLink?: string;
  clientGithub?: string;
  serverGithub?: string;
  category: string;
  projectDuration: string;
  projectTeamSize: string;
  projectType: string;
  projectStatus: string;
  projectStack: string;
  projectChallenges: string;
  tags: string[];
  technologies: string[];
  keyFeatures: string[];
}
