import { createHash } from 'node:crypto';

export class Hash {
  static make(value: string) {
    return createHash('sha256').update(value).digest('base64');
  }
}
