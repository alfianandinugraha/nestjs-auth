import { HttpSuccess } from '@app/utils/http-success';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { FastifyReply } from 'fastify';
import { BaseModel } from '@app/models/base';

/**
 * @description
 * This interceptor is used to filter out the guarded properties
 */
@Injectable()
export class ModelInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        const isHttpSuccess = res instanceof HttpSuccess;
        if (!isHttpSuccess) return res;

        context
          .switchToHttp()
          .getResponse<FastifyReply>()
          .status(res.statusCode);

        const isModel = res.data instanceof BaseModel;
        const hasGuard = res.data?.['$guard']?.length;
        let data = res.data;

        if (isModel && hasGuard) {
          const guardedProps = [...res.data['$guard'], '$guard'];
          data = Object.keys(res.data).reduce((acc, prop) => {
            if (guardedProps.includes(prop)) return acc;

            return {
              ...acc,
              [prop]: data[prop],
            };
          }, {});
        }

        return {
          message: res.message,
          data: data,
          statusCode: res.statusCode,
        };
      }),
    );
  }
}
