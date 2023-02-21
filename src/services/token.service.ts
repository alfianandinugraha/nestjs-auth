import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Database } from 'sqlite3';
import Token from '@app/models/token';
import { Hash } from '@app/utils/hash';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(token: string, conn?: Database) {
    const db = conn ?? this.databaseService.open();
    const tokens: Token[] = await this.databaseService.all(
      'SELECT * FROM tokens WHERE token = $token',
      db,
      {
        $token: token,
      },
    );
    db.close();

    return tokens.map((item) => item.token);
  }

  async store(dto: Pick<Token, 'token' | 'user_id'>, conn?: Database) {
    const db = conn ?? this.databaseService.open();

    await this.databaseService.run(
      'INSERT INTO tokens(token, user_id) VALUES ($token, $userId)',
      db,
      {
        $token: dto.token,
        $userId: dto.user_id,
      },
    );

    !conn && db.close();

    return true;
  }

  generate() {
    return Hash.make(crypto.randomBytes(10).toString('hex'));
  }
}
