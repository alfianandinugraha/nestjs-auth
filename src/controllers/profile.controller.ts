import { Controller, Get, Put } from '@nestjs/common';

@Controller('/profile')
export class ProfileController {
  @Get('/')
  index() {
    return {
      message: 'Hello World!',
    };
  }

  @Put('/')
  update() {
    return {
      message: 'Hello World!',
    };
  }
}
