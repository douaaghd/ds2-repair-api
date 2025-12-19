import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './entities/intervention.entity';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { AuthModule } from '../auth/auth.module';
import { Device } from '../devices/entities/device.entity'; 
import { SparePart } from '../parts/entities/spare-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention, Device, SparePart]),
    AuthModule, 
  ],
  controllers: [InterventionsController],
  providers: [InterventionsService],
})
export class InterventionsModule {}
