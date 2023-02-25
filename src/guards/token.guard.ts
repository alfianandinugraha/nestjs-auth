import User from '@app/models/user';
import { CacheService } from '@app/services/cache.service';
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
  constructor(
    private readonly tokenService: TokenService,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request: FastifyGuardRequest = http.getRequest();
    const authorization = request.headers.authorization ?? '';
    const [, token] = authorization.split(' ');

    if (!token) throw new UnauthorizedException();

    const user: User | null = await this.cacheService.fetch(
      [`AccessToken`, token],
      async () => await this.tokenService.findUser(token),
      10,
    );

    if (!user) throw new UnauthorizedException();

    request.user = new User(user);
    request.token = token;

    return true;
  }
}
