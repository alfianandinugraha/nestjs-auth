import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'nestjs-zod/z';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  async transform(
    value: any,
    { metatype, type }: ArgumentMetadata & { metatype: ZodMetatype },
  ) {
    if (type !== 'body') return value;

    try {
      await metatype.schema.parseAsync(value);
      return value;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Invalid input.',
          errors: error.issues,
        });
      }

      throw new BadRequestException('Invalid input.', error);
    }
  }
}

interface ZodMetatype {
  isZodDto: boolean;
  create(input: unknown): any;
  schema: ZodSchema;
}
