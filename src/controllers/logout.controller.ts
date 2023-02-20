import { Controller, Delete } from '@nestjs/common';

@Controller('/logout')
export class LogoutController {
  @Delete('/')
  remove() {
    return {
      message: 'Hello World!',
    };
  }
}
