import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'ds2_repair_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PartsModule,
    DevicesModule,
    InterventionsModule,
  ],
})
export class AppModule {}
