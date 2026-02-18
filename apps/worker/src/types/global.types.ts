export interface EnrollmentWorkflowInput {
  cadence: number;
  contactEmail: string;
  selectedCadence: {
    name: string;
    steps: step[];
    id: number;
  };
  newRecord: boolean;
}

export interface step {
  id: number;
  type: 'WAIT' | 'SEND_EMAIL';
  subject?: string;
  body?: string;
  seconds?: number;
}

export interface WorkflowState {
  currentStepIndex: number;
  stepsVersion: number;
  status: 'RUNNING' | 'COMPLETED';
}
