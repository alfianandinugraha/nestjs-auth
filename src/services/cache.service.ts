import { Injectable, Logger, Scope } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { createClient, commandOptions } from 'redis';
import { pack, unpack } from 'msgpackr';

@Injectable({
  scope: Scope.DEFAULT,
})
export class CacheService {
  private client: RedisClientType;
  private readonly logger = new Logger(CacheService.name);

  constructor() {
    this.client = createClient();
    this.logger.log('Init CacheService');
  }

  /**
   * @description
   * Connect to Redis
   */
  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      this.logger.log('Redis connected');
    }
  }

  /**
   * @description
   * Set data to cache
   */
  async set(key: string[], value: any, expired = 10) {
    await this.connect();
    await this.client.set(key.join(':'), pack(value), {
      EX: expired,
    });
  }

  /**
   * @description
   * Get data from cache
   */
  async get(key: string[]) {
    await this.connect();
    const value = await this.client.get(
      commandOptions({ returnBuffers: true }),
      key.join(':'),
    );
    if (!value) return null;
    const result = unpack(value);
    return result;
  }

  async remove(key: string[]) {
    await this.connect();
    await this.client.del(key.join(':'));
  }

  /**
   * @description
   * Fetch data from cache, if not found, call callback to get data and store to cache
   */
  async fetch<T>(
    key: string[],
    callback: () => Promise<T>,
    expired = 10,
  ): Promise<T> {
    await this.connect();
    let value = await this.get(key);
    if (!value) {
      value = await callback();
      await this.set(key, value, expired);
    }
    return value;
  }
}
