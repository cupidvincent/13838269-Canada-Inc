import { CadencesService } from './../cadences/cadences.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Connection, WorkflowHandle } from '@temporalio/client';
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
    const handle: WorkflowHandle = this.client.workflow.getHandle(workflowId);

    await handle.signal('updateCadence', steps);
    return { success: true };
  }

  async queryState(workflowId: string) {
    const handle = this.client.workflow.getHandle(workflowId);

    return handle.query('getState');
  }
}
