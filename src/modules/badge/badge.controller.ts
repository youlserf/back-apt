import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Badge } from 'src/entities/badge.entity';
import { BadgeService } from './badge.service';
import { JwtAuthGuard } from 'src/security/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  async getBadges(): Promise<Badge[]> {
    return this.badgeService.getBadges();
  }

  @Get(':id')
  async getBadgeById(@Param('id') id: number): Promise<Badge> {
    return this.badgeService.getBadgeById(id);
  }

  @Post()
  async createBadge(@Body() badgeData: { name: string; levelRequired: number }): Promise<Badge> {
    return this.badgeService.createBadge(badgeData);
  }

  @Put(':id')
  async updateBadge(
    @Param('id') id: number,
    @Body() badgeData: { name: string; levelRequired: number },
  ): Promise<Badge> {
    return this.badgeService.updateBadge(id, badgeData);
  }

  @Delete(':id')
  async deleteBadge(@Param('id') id: number): Promise<void> {
    return this.badgeService.deleteBadge(id);
  }
}
