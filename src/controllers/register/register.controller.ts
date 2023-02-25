import { AuthService } from '@app/services/auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@app/pipes/zod.pipe';
import { RegisterUserDTO } from './dto/register-user.dto';
import { Hash } from '@app/utils/hash';
import { HttpSuccess } from '@app/utils/http-success';

@Controller('/register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @UsePipes(ZodValidationPipe)
  async store(@Body() dto: RegisterUserDTO) {
    await this.authService.register({
      name: dto.name,
      email: dto.email,
      password: Hash.make(dto.password),
    });

    return HttpSuccess.created('Success register');
  }
}
