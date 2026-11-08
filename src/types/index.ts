export type ServiceCluster =
  | "all"
  | "siscloud"
  | "crm"
  | "ai"
  | "software";

export interface ServiceItem {
  id: string;
  proto: string;
  title: string;
  cluster: ServiceCluster;
  clusterLabel: string;
  timeBadge: string;
  badgeClass: string;
  description: string;
  stack: string;
  deliverables: string[];
  ctaUrl: string;
}

export interface SubSectorItem {
  name: string;
  items: string[];
}

export interface SectorItem {
  id: string;
  icon: string;
  code: string;
  title: string;
  highlightBadge?: string;
  subsectors?: SubSectorItem[];
  procesos: string[];
  casos: string;
  beneficios: string;
  modulos: string[];
  waText: string;
}

export interface SisCloudModularFeature {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SolutionOption {
  key: string;
  name: string;
  engine: string;
  delivery: string;
}

export interface FunnelState {
  solutionKey: string;
  solutionName: string;
  engine: string;
  delivery: string;
  usersKey: string;
  usersLabel: string;
  infraKey: string;
  infraLabel: string;
  modules: string[];
  code: string;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  ctaUrl?: string;
  ctaLabel?: string;
}
