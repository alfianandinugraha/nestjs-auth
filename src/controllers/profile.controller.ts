import { TokenGuard } from '@app/guards/token.guard';
import { FastifyGuardRequest } from 'fastify';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ModelInterceptor } from '@app/interceptors/model.interceptor';
import { HttpSuccess } from '@app/utils/http-success';

@Controller('/profile')
@UseGuards(TokenGuard)
@UseInterceptors(ModelInterceptor)
export class ProfileController {
  @Get('/')
  async index(@Req() req: FastifyGuardRequest) {
    return new HttpSuccess('Success get profile', req.user);
  }
}
