import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CadencesService } from './cadences.service';
import { CreateCadenceDto } from './dtos/create-cadence.dto';
import { UpdateCadenceDto } from './dtos/update-cadence.dto';

@Controller('cadences')
export class CadencesController {
  constructor(private cadencesService: CadencesService) {}
  @Post()
  create(@Body(ValidationPipe) createCadenceDto: CreateCadenceDto) {
    return this.cadencesService.create(createCadenceDto);
  }

  @Get()
  findAll() {
    return this.cadencesService.get();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id?: number) {
    return this.cadencesService.get(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedCadence: UpdateCadenceDto,
  ) {
    return this.cadencesService.update(id, updatedCadence);
  }
}
