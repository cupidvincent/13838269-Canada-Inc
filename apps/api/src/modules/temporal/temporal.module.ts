import { Module } from '@nestjs/common';
import { TemporalService } from './temporal.service';
import { CadencesModule } from '../cadences/cadences.module';

@Module({
  imports: [CadencesModule],
  providers: [TemporalService],
  exports: [TemporalService],
})
export class TemporalModule {}
