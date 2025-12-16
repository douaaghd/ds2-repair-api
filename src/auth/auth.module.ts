import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

import { RolesGuard } from './roles.guard';


@Module({
  imports: [
    forwardRef(() => UsersModule), // <-- pour casser la dépendance circulaire
    JwtModule.register({
      secret: 'SECRET_KEY',       // bech nbadloha baed
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy,RolesGuard],
  controllers: [AuthController],
  exports: [JwtModule, AuthService,RolesGuard], // nexportiw AuthService zeda bech ken sthakineh fi usersModel
})
export class AuthModule {}
