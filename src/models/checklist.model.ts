export interface Forklift {
  id: string;
  name: string;
  model: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  status: 'ok' | 'issue' | 'pending';
  comment: string;
  photo: string | null; // base64 string
}

export type Checklist = ChecklistItem[];

export interface Inspection {
  forkliftId: string;
  forkliftName: string;
  checklist: Checklist;
  inspector: string;
  shift: string;
  crew: string;
  location: string;
  odometer: string;
  timestamp: number;
  inspectionDate: string;
  signature?: string | null;
}

export interface InspectionSession {
  id: number; // timestamp
  inspections: Inspection[];
}

export interface IncidentReport {
  id?: number; // Auto-incrementing primary key
  forkliftId: string;
  severity: 'Alta' | 'Media' | 'Baja';
  description: string;
  photo: string | null;
  reporter: string;
  timestamp: number;
}
