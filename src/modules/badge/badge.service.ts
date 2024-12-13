import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/entities/badge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
  ) {}

  async getBadges(): Promise<Badge[]> {
    return this.badgeRepository.find();
  }

  async getBadgeById(id: number): Promise<Badge> {
    const badge = await this.badgeRepository.findOne({ where: { id: id } });
    if (!badge) {
      throw new NotFoundException(`Badge with id ${id} not found`);
    }
    return badge;
  }

  async createBadge(badgeData: { name: string; levelRequired: number }): Promise<Badge> {
    const badge = this.badgeRepository.create(badgeData);
    return this.badgeRepository.save(badge);
  }

  async updateBadge(id: number, badgeData: { name: string; levelRequired: number }): Promise<Badge> {
    const badge = await this.getBadgeById(id); 
    badge.name = badgeData.name;
    badge.levelRequired = badgeData.levelRequired;
    return this.badgeRepository.save(badge);
  }

  async deleteBadge(id: number): Promise<void> {
    const badge = await this.getBadgeById(id); 
    await this.badgeRepository.remove(badge);
  }
}
