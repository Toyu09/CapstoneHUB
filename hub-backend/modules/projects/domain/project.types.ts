// Domain interfaces y tipos compartidos
export interface ProjectHistoryEntry {
  date: Date;
  status: string;
  description: string;
  author: string;
}

export interface ProjectDetails {
  generalObjectives?: string;
  justification?: string;
  expectedResult?: string;
  beneficiaries?: string[];
  methodologies?: string[];
  legalFramework?: string;
}

export interface ProjectAttachment {
  id: string;
  url: string;
  name: string;
  uploadedAt: Date;
}
