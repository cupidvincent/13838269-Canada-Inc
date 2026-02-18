import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CadencesModule } from './modules/cadences/cadences.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { TemporalService } from './modules/temporal/temporal.service';
import { TemporalModule } from './modules/temporal/temporal.module';

@Module({
  imports: [CadencesModule, EnrollmentsModule, TemporalModule],
  controllers: [AppController],
  providers: [AppService, TemporalService],
})
export class AppModule {}
