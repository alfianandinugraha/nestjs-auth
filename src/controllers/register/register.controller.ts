import { AuthService } from '@app/services/auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@app/pipes/zod.pipe';
import { RegisterUserDTO } from './dto/register-user.dto';
import { Hash } from '@app/utils/hash';

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

    return {
      message: 'User created successfully',
      statusCode: 201,
    };
  }
}
