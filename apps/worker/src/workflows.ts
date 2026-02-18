import { proxyActivities, sleep, log, defineQuery, defineSignal, setHandler } from '@temporalio/workflow';
// Only import the activity types
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

// export async function enrollmentWorkflowOld(data: EnrollmentWorkflowInput): Promise<any> {
//   const { newRecord, selectedCadence } = data;
//   let steps: step[] = selectedCadence.steps;
//   let currentStepIndex = 0;
//   let stepsVersion = 1;
//   let status: 'RUNNING' | 'COMPLETED' = 'RUNNING';

//   setHandler(getStateQuery, () => ({
//     currentStepIndex,
//     stepsVersion,
//     status,
//   }));

//   // Signal handler
//   setHandler(updateCadenceSignal, (newSteps: step[]) => {
//     steps = newSteps;
//     stepsVersion++;

//     if (steps.length <= currentStepIndex) {
//       status = 'COMPLETED';
//     }
//   });
//   if (newRecord) {
//     for (const step of selectedCadence.steps) {
//       if (step.type === 'WAIT') {
//         log.info('processing...');
//         await sleep(`${step.seconds} seconds`);
//         log.info('done ...');
//       } else {
//         await sendEmail(step.id.toString());
//         log.info('Email Sent !');
//       }
//       setHandler(getStateQuery, () => ({
//         currentStepIndex,
//         stepsVersion,
//         status,
//       }));
//       currentStepIndex++;
//     }
//   } else {
//     // Execution loop
//     while (currentStepIndex < steps.length && status === 'RUNNING') {
//       const step = steps[currentStepIndex];

//       if (step.type === 'WAIT' && step.seconds) {
//         await sleep(`${step.seconds} seconds`);
//       }

//       if (step.type === 'SEND_EMAIL') {
//         await sendEmail(step.id.toString());
//       }

//       currentStepIndex++;
//     }
//   }
//   status = 'COMPLETED';
//   return 'done processsing';
// }

export async function enrollmentWorkflow(data: EnrollmentWorkflowInput): Promise<void> {
  const { newRecord, selectedCadence } = data;
  let steps: step[] = selectedCadence.steps;
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
    console.log({
      steps,
      currentStepIndex,
    });
    if (steps.length <= currentStepIndex) {
      status = 'COMPLETED';
    }
  });
  console.log({
    status,
    currentStepIndex,
    steps: steps.length,
  });
  // Main execution loop
  while (status === 'RUNNING' && currentStepIndex < steps.length) {
    const step = steps[currentStepIndex];

    if (step.type === 'WAIT' && step.seconds) {
      await sleep(step.seconds * 1000);
    }

    if (step.type === 'SEND_EMAIL') {
      await sendEmail(step.id.toString());
    }

    currentStepIndex++;
  }

  status = 'COMPLETED';
}
