import { FastifyRequest } from 'fastify';
import User from './models/user';

declare module 'fastify' {
  interface FastifyGuardRequest extends FastifyRequest {
    user: User;
    token: string;
  }
}
