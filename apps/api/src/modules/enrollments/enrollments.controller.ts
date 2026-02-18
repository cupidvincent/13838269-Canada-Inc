import { TemporalService } from './../temporal/temporal.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private temporalService: TemporalService,
  ) {}
  @Post()
  async create(@Body(ValidationPipe) body: CreateEnrollmentDto) {
    return await this.enrollmentsService.create(body);
  }

  @Post(':id/update-cadence')
  async updateCadence(@Param('id') id: string, @Body() body: { steps: any[] }) {
    console.log({ id, body });
    // const handle = this.temporalClient.workflow.getHandle(id);

    // return await handle.signal('updateCadence', body.steps);

    // return this.temporalService.startEnrollmentWorkflow({
    //   workflowId: body.id.toString(),
    //   newRecord: false,
    //   steps: body.steps,
    // });
    return await this.temporalService.signalUpdateCadence(id, body.steps);
    // return true;
  }

  @Get()
  findAll() {}

  @Patch()
  update() {}
}
