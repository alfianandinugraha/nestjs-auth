import { ZodValidationPipe } from '@app/pipes/zod.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from '@app/services/auth.service';
import { HttpSuccess } from '@app/utils/http-success';

@Controller('/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @UsePipes(ZodValidationPipe)
  async store(@Body() dto: LoginUserDTO) {
    const token = await this.authService.login({
      email: dto.email,
      password: dto.password,
    });

    return new HttpSuccess('Success login', token);
  }
}
