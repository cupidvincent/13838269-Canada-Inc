import { proxyActivities, sleep, log, defineQuery, defineSignal, setHandler } from '@temporalio/workflow';

import type * as activities from './activities';
import { EnrollmentWorkflowInput, WorkflowState, step } from './types/global.types';

export const updateCadenceSignal = defineSignal<[step[]]>('updateCadence');
export const getStateQuery = defineQuery<WorkflowState>('getState');

const { greet, sendEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}

export async function enrollmentWorkflow(data: EnrollmentWorkflowInput): Promise<void> {
  const { selectedCadence } = data;
  console.log({ selectedCadenceselectedCadence: selectedCadence });
  let steps: step[] = selectedCadence?.steps;
  let currentStepIndex = 0;
  let stepsVersion = 1;
  let status: 'RUNNING' | 'COMPLETED' = 'RUNNING';

  // Query handler
  setHandler(getStateQuery, () => ({
    currentStepIndex,
    stepsVersion,
    status,
  }));

  // Signal handler
  setHandler(updateCadenceSignal, (newSteps: step[]) => {
    steps = newSteps;
    stepsVersion++;
    console.log('setHandler ----- 1', {
      length: steps.length,
      currentStepIndex,
    });
    if (steps.length <= currentStepIndex) {
      status = 'COMPLETED';
    }
  });
  console.log('---- show 1', {
    status,
    currentStepIndex,
    steps: steps?.length,
  });
  // Main execution loop
  while (status === 'RUNNING' && currentStepIndex < steps?.length) {
    const step = steps[currentStepIndex];

    if (step.type === 'WAIT' && step.seconds) {
      await sleep(step.seconds * 1000);
    }

    if (step.type === 'SEND_EMAIL') {
      await sendEmail(step.id.toString());
    }

    currentStepIndex++;
    console.log('---- show 2', {
      status,
      currentStepIndex,
      steps: steps.length,
    });
  }

  status = 'COMPLETED';
}
