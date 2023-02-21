import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from './database.service';
import User from '@app/models/user';
import { ProfileService } from './profile.service';
import { Hash } from '@app/utils/hash';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly profileService: ProfileService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: Omit<User, 'user_id'>) {
    const db = this.databaseService.open();

    await this.databaseService.run(
      'INSERT INTO users (name, email, password) VALUES ($name, $email, $password);',
      db,
      {
        $name: dto.name,
        $password: dto.password,
        $email: dto.email,
      },
    );

    const user: User = await this.profileService.findByEmail(dto.email, db);

    db.close();
    return user;
  }

  async login(dto: Pick<User, 'email' | 'password'>) {
    const db = this.databaseService.open();

    const user: User = await this.profileService.findByEmail(dto.email, db);

    if (!user || !Hash.compare(dto.password, user.password)) {
      db.close();
      throw new UnauthorizedException();
    }

    const token = this.tokenService.generate();
    await this.tokenService.store(
      {
        user_id: user.user_id,
        token,
      },
      db,
    );

    db.close();
    return token;
  }
}
