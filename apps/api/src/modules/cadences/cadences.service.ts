import { Injectable } from '@nestjs/common';
import { CreateCadenceDto } from './dtos/create-cadence.dto';
import { UpdateCadenceDto } from './dtos/update-cadence.dto';

@Injectable()
export class CadencesService {
  private cadences: CreateCadenceDto[] = [];

  create(createCadenceDto: CreateCadenceDto): CreateCadenceDto {
    const highestId = this.cadences.length
      ? Math.max(...this.cadences.map((c) => c.id ?? 0))
      : 0;

    const newCadence: CreateCadenceDto = {
      ...createCadenceDto,
      id: highestId + 1,

      steps: createCadenceDto.steps.map((step, index) => ({
        ...step,
        id: step.id ?? index + 1,
      })),
    };

    this.cadences.push(newCadence);

    return newCadence;
  }

  get(id?: number) {
    if (id) {
      return this.cadences.filter((cadence) => cadence.id === Number(id))[0];
    }
    return this.cadences;
  }

  update(id: number, updatedCadence: UpdateCadenceDto) {
    this.cadences = this.cadences.map((cadence) => {
      if (cadence.id === id) {
        cadence = {
          ...cadence,
          ...updatedCadence,
        };
      }
      return cadence;
    });
    return updatedCadence;
  }
}
