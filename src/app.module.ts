import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { LoginController } from '@app/controllers/login.controller';
import { ProfileController } from '@app/controllers/profile.controller';

@Module({
  imports: [],
  controllers: [LoginController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
