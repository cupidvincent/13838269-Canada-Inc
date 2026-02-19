import { Injectable, NotFoundException } from '@nestjs/common';
import { TemporalService } from '../temporal/temporal.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private temporalService: TemporalService) {}

  async create(body: CreateEnrollmentDto) {
    const workflowId = `enrollment-${Date.now()}`;

    const response = await this.temporalService.startEnrollmentWorkflow({
      workflowId,
      cadence: body.cadenceId,
      contactEmail: body.contactEmail,
    });
    if (!response) {
      throw new NotFoundException('Cadence not found');
    }

    return { workflowId };
  }
}
