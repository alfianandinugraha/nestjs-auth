import { Injectable, Logger } from '@nestjs/common';
import { join } from 'node:path';
import { Database } from 'sqlite3';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private path = join(__dirname, '..', '..', 'db', 'db.sqlite');

  /**
   * @description
   * Open a connection to the database
   */
  open() {
    return new Database(this.path).on('open', () => {
      this.logger.log('Database connected');
    });
  }

  async get<T>(sql: string, conn: Database, param?: any) {
    return new Promise<T>((resolve, reject) => {
      conn.get(sql, param, function (err, row: T) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  async all<T>(sql: string, conn: Database, param?: any) {
    return new Promise<T>((resolve, reject) => {
      conn.all(sql, param, function (err: Error, row: T) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  async run<T>(sql: string, conn: Database, param?: any) {
    return new Promise<T>((resolve, reject) => {
      conn.run(sql, param, function (err: Error, row: T) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}
