import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/services/database.service';
import User from '@app/models/user';
import { Database } from 'sqlite3';

@Injectable()
export class ProfileService {
  constructor(
    private readonly databaseService: DatabaseService = new DatabaseService(),
  ) {}

  async get(userId: number, conn?: Database) {
    const db = conn ?? this.databaseService.open();

    const user: User = await this.databaseService.get(
      'SELECT * FROM users WHERE user_id = $userId OR email = $email;',
      db,
      {
        $userId: userId,
      },
    );

    !conn && db.close();
    return user;
  }

  async findByEmail(email: string, conn?: Database) {
    const db = conn ?? this.databaseService.open();

    const user: User = await this.databaseService.get(
      'SELECT * FROM users WHERE email = $email;',
      db,
      {
        $email: email,
      },
    );

    !conn && db.close();
    return new User(user);
  }
}
