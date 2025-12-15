// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint pour s'inscrire
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    return this.authService.register(email, username, password);
  }

  // Endpoint pour se connecter
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
