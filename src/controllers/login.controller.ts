import { Controller, Post } from '@nestjs/common';

@Controller('/login')
export class LoginController {
  @Post('/')
  store() {
    return {
      message: 'Hello World!',
    };
  }
}
