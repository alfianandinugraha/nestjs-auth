import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ProfileService } from '@app/services/profile.service';

const profileService = new ProfileService();

const schema = z.object({
  email: z
    .string()
    .email()
    .refine(
      async (email) => !(await profileService.findByEmail(email)),
      'Email already exists',
    ),
  password: z.string().min(6),
  name: z.string().min(0),
});

export class RegisterUserDTO extends createZodDto(schema) {}
