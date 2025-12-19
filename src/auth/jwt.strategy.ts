// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ajoute ceci par sécurité
      secretOrKey: 'SECRET_KEY', 
    });
  }

  async validate(payload: any) {
    // On vérifie si l'ID est dans 'id' ou dans 'sub'
    const userId = payload.id || payload.sub;

    // Log de débogage pour voir ce que contient ton token décodé
    console.log('Payload décodé du JWT:', payload);

    return { 
      id: userId, 
      email: payload.email, 
      role: payload.role 
    };
  }
}