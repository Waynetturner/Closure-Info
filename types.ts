export enum AppView {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  TASK_DETAIL = 'TASK_DETAIL',
  DOCUMENT_GENERATOR = 'DOCUMENT_GENERATOR'
}

export enum TaskCategory {
  GOVERNMENT = 'Government Notices',
  FINANCIAL = 'Financial Accounts',
  PROPERTY = 'Property & Assets',
  UTILITIES = 'Utilities & Services'
}

export enum TaskStatus {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
  SKIPPED = 'Skipped'
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  status: TaskStatus;
  description: string;
  estimatedTime: string;
  requiresDocuments: string[];
}

export interface DeceasedProfile {
  fullName: string;
  dateOfBirth: string;
  dateOfDeath: string;
  residenceState: string;
  hasWill: boolean | null;
  estateValueEstimate: string;
}

export interface AppState {
  currentView: AppView;
  activeTaskId: string | null;
  profile: DeceasedProfile;
  tasks: Task[];
  completedCount: number;
  totalCount: number;
}