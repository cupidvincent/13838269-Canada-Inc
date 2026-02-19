import { CadencesService } from './../cadences/cadences.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  Client,
  Connection,
  WorkflowHandle,
  WorkflowNotFoundError,
} from '@temporalio/client';
import { inspect } from 'util';
import { stepDto } from './dto/steps.dto';
@Injectable()
export class TemporalService implements OnModuleInit {
  constructor(private cadencesService: CadencesService) {}
  private client: Client;

  async onModuleInit() {
    const connection = await Connection.connect({
      address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
    });

    this.client = new Client({
      connection,
      namespace: process.env.TEMPORAL_NAMESPACE || 'default',
    });
  }

  async startEnrollmentWorkflow(data: {
    workflowId: string;
    cadence?: number;
    contactEmail?: string;
    newRecord?: boolean;
    steps?: stepDto[];
  }) {
    const selectedCadence = this.cadencesService.get(data.cadence);

    if (!selectedCadence) {
      return false;
    }
    return this.client.workflow.start('enrollmentWorkflow', {
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world',
      workflowId: data.workflowId,
      args: [
        {
          cadence: data.cadence,
          contactEmail: data.contactEmail,
          selectedCadence,
          newRecord: data.newRecord || false,
        },
      ],
    });
  }

  async signalUpdateCadence(workflowId: string, steps: any) {
    try {
      const handle: WorkflowHandle = this.client.workflow.getHandle(workflowId);
      const description = await handle.describe();
      if (description.status.name !== 'RUNNING') {
        throw new BadRequestException(
          `Cannot update workflow. Status is ${description.status.name}`,
        );
      }
      await handle.signal('updateCadence', steps);
      return { success: true };
    } catch (error) {
      if (error instanceof WorkflowNotFoundError) {
        throw new NotFoundException('Workflow not found');
      }

      throw error; // let Nest handle other errors
    }
  }

  async queryState(workflowId: string) {
    try {
      const handle = this.client.workflow.getHandle(workflowId);

      const state = await handle.query('getState');

      return {
        success: true,
        state,
      };
    } catch (error: any) {
      console.error('Workflow query error:', error);

      if (error instanceof WorkflowNotFoundError) {
        return {
          success: false,
          message: 'Workflow not found',
        };
      }

      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: error.message || 'Unknown error',
      };
    }
  }
}
