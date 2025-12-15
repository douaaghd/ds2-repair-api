// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, { secret: 'SECRET_KEY' });
      request['user'] = payload;
      return true;
    } catch {
      return false;
    }
  }
}
