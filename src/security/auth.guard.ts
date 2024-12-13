import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.url.startsWith('/auth') || request.url.startsWith('/seed')) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new ForbiddenException('You are not authorized to access this resource');
    }

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const role = user.role;
    const route = request.url;

    /*  // Permitir solo acciones de lectura (GET) para el rol "USER", excepto para subir Pokemones
     if (role === 'USER' && method !== 'GET' && !(method === 'POST' && route.startsWith('/pokemons/upload'))) {
       throw new ForbiddenException('You do not have permission to perform this action');
     }
 
     // Si el usuario es ADMIN, permitir todas las acciones
     if (role === 'ADMIN') {
       return user;
     } */

    request.user = user;

    return user;
  }
}
