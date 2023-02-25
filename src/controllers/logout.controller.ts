import { TokenGuard } from '@app/guards/token.guard';
import { AuthService } from '@app/services/auth.service';
import { HttpSuccess } from '@app/utils/http-success';
import { Controller, Delete, UseGuards, Req } from '@nestjs/common';
import { FastifyGuardRequest } from 'fastify';

@Controller('/logout')
@UseGuards(TokenGuard)
export class LogoutController {
  constructor(private readonly authService: AuthService) {}

  @Delete('/')
  async remove(@Req() req: FastifyGuardRequest) {
    await this.authService.logout(req.token);
    return new HttpSuccess('Success logout', null);
  }
}
