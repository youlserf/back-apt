import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeRequest } from 'src/entities/badge-request.entity';
import { Badge } from 'src/entities/badge.entity';
import { User } from 'src/entities/user.entity';
import { BadgeRequestController } from './badge-request.controller';
import { BadgeRequestGateway } from './badge-request.gateway';
import { BadgeRequestService } from './badge-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeRequest, User, Badge])],
  controllers: [BadgeRequestController],
  providers: [BadgeRequestGateway, BadgeRequestService],
  exports: [TypeOrmModule, BadgeRequestService],
})
export class BadgeRequestModule {}
