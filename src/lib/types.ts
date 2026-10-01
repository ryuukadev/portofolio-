export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: "Web App" | "Mobile" | "UI/UX";
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "design" | "tools";
  level: number;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

// Note: React namespace resolved via @types/react in tsconfig.

export interface PersonalInfo {
  fullName: string;
  title: string;
  grade: string;
  major: string;
  school: string;
  location: string;
  bio: string;
}
