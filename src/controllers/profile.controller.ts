import { ProfileService } from '@app/services/profile.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  async index() {
    const profile = await this.profileService.get(1);

    return {
      message: "Successfully fetched user's profile",
      data: profile,
    };
  }
}
