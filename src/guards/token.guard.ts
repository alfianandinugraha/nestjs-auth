import { TokenService } from '@app/services/token.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyGuardRequest } from 'fastify';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request: FastifyGuardRequest = http.getRequest();
    const authorization = request.headers.authorization ?? '';
    const [, token] = authorization.split(' ');

    if (!token) throw new UnauthorizedException();

    const user = await this.tokenService.findUser(token);
    request.user = user;
    request.token = token;

    return true;
  }
}
