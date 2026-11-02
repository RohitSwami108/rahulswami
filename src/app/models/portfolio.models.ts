export type ProjectCategory = 
  | 'all' 
  | 'bedroom' 
  | 'living' 
  | 'wardrobe' 
  | 'kitchen'
  | 'feature-wall' 
  | 'exterior'
  | 'drawings';

export interface ProjectSpecs {
  dimensions?: string;
  materials?: string[];
  lighting?: string;
  camera?: string;
  colorPalette?: { name: string; hex: string }[];
  renderEngine?: string;
}

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  subtitle: string;
  description: string;
  location: string;
  studio: string;
  year: string;
  software: string[];
  mainImage: string;
  gallery: string[];
  wireframeImage?: string;
  cadDrawing?: string;
  specs: ProjectSpecs;
  featured: boolean;
  highlights: string[];
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  tools: string[];
  badge: string;
}

export interface SkillItem {
  name: string;
  level: number;
  levelText: string;
  experienceYears: string;
  tags: string[];
}

export interface SkillGroup {
  categoryName: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  software: string[];
  turnaround: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  year: string;
  field: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  summary: string;
  stats: {
    experienceYears: string;
    projectsCompleted: string;
    photorealisticRenders: string;
    autocadPrecision: string;
  };
}

export interface RenderVaultItem {
  id: number;
  fileName: string;
  imagePath: string;
  title: string;
  category: string;
}
