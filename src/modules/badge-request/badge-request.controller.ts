import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BadgeRequest } from 'src/entities/badge-request.entity';
import { Badge } from 'src/entities/badge.entity';
import { BadgeRequestService } from './badge-request.service';

import { JwtAuthGuard } from 'src/security/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('badge-requests')
export class BadgeRequestController {
  constructor(private readonly badgeRequestService: BadgeRequestService) {}

  @Post('create')
  async createRequest(@Body() body: { userId: number; badgeId: number }): Promise<BadgeRequest> {
    return this.badgeRequestService.createRequest(body.userId, body.badgeId);
  }

  @Post('update/:id')
  async updateRequest(@Param('id') id: number, @Body() body: { status: string }): Promise<BadgeRequest> {
    return this.badgeRequestService.updateRequest(id, body.status);
  }

  @Get()
  async getAllRequests(@Query('status') status?: string): Promise<BadgeRequest[]> {
    const filter = status ? { status } : {};
    return this.badgeRequestService.getAllRequests(filter);
  }


  @Get('user/:userId/badges')
  async getUserBadges(@Param('userId') userId: number): Promise<Badge[]> {
    return this.badgeRequestService.getUserBadges(userId);
  }
}
