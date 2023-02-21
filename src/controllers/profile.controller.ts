import { TokenGuard } from '@app/guards/token.guard';
import { FastifyGuardRequest } from 'fastify';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';

@Controller('/profile')
@UseGuards(TokenGuard)
export class ProfileController {
  @Get('/')
  async index(@Req() req: FastifyGuardRequest) {
    return {
      message: "Successfully fetched user's profile",
      data: req.user.serialize(),
    };
  }
}
