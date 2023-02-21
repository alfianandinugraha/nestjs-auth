import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ProfileService } from '@app/services/profile.service';

const profileService = new ProfileService();

const schema = z.object({
  email: z
    .string()
    .email()
    .refine(
      async (email) => await profileService.findByEmail(email),
      "Email doesn't exist",
    ),
  password: z.string().min(0).max(255),
});

export class LoginUserDTO extends createZodDto(schema) {}
