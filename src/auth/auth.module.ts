import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule), // <-- pour casser la dépendance circulaire
    JwtModule.register({
      secret: 'SECRET_KEY',       // bech nbadloha baed
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, AuthService], // nexportiw AuthService zeda bech ken sthakineh fi usersModel
})
export class AuthModule {}
