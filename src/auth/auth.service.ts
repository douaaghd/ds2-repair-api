import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription : NestJS gérera les erreurs si l'email existe déjà dans usersService
  async register(email: string, username: string, password: string) {
    return this.usersService.create(email, username, password);
  }

  // Connexion
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    
    // On utilise UnauthorizedException pour une réponse 401 propre
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Le payload contient l'ID (sub) et le Rôle comme demandé dans l'énoncé
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }
}