import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { SparePart } from './entities/spare-part.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SparePart]),
    AuthModule, // Nasta79ou AuthModule bech nastaamlou RolesGuard (bech naarfo chkoun Admin)
  ],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
