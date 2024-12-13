import { Module } from '@nestjs/common';
import { BadgeModule } from './modules/badge/badge.module';
import { UserModule } from './modules/user/user.module';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    BadgeModule,
    UserModule,
  ],
  controllers: [SeedController],
})
export class SeedModule {}
