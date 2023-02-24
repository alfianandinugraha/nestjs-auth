import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { LoginController } from '@app/controllers/login/login.controller';
import { ProfileController } from '@app/controllers/profile.controller';
import { ProfileService } from '@app/services/profile.service';
import { DatabaseService } from '@app/services/database.service';
import { AuthService } from '@app/services/auth.service';
import { RegisterController } from '@app/controllers/register/register.controller';
import { TokenService } from './services/token.service';
import { LogoutController } from './controllers/logout.controller';

@Module({
  imports: [],
  controllers: [
    LoginController,
    ProfileController,
    RegisterController,
    LogoutController,
  ],
  providers: [
    AppService,
    ProfileService,
    DatabaseService,
    AuthService,
    TokenService,
  ],
})
export class AppModule {}
