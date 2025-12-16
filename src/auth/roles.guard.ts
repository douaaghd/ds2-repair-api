// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // nrécupèriw les rôles définis par le décorateur @Roles
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      // Si aucun rôle requis, mafamech accee
      return true;
    }

    // Request 7atta bech nlawjou aal user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      // Ken ma fama 7atta user (mouch connecté) wela ma andouch 'role', donc nwalliw ma nkhalliwhouch 
      return false;
    }

    // Nchoufou est-ce que rôle mtaa l'utilisateur mawjoud flista mtaa requiredRoles wela laa.
    return requiredRoles.includes(user.role);
  }
}
