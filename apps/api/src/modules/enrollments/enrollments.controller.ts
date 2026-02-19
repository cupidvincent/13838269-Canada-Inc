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
import {
  CreateEnrollmentDto,
  UpdateCadenceDto,
} from './dto/create-enrollment.dto';

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
  async updateCadence(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateCadenceDto,
  ) {
    console.log({ id, body });

    return await this.temporalService.signalUpdateCadence(id, body.steps);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('idddd', id);
    return await this.temporalService.queryState(id);
  }

  @Get()
  findAll() {}

  @Patch()
  update() {}
}
