import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgeRequest } from 'src/entities/badge-request.entity';
import { Badge } from 'src/entities/badge.entity';
import { User } from 'src/entities/user.entity';
import { BadgeRequestStatusEnum } from 'src/enums/BadgeRequestStatusEnum';
import { Repository } from 'typeorm';
import { BadgeRequestGateway } from './badge-request.gateway';

@Injectable()
export class BadgeRequestService {
  constructor(
    @InjectRepository(BadgeRequest)
    private readonly badgeRequestRepository: Repository<BadgeRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    private readonly badgeRequestGateway: BadgeRequestGateway,
  ) {}

  async createRequest(userId: number, badgeId: number): Promise<BadgeRequest> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const badge = await this.badgeRepository.findOne({ where: { id: badgeId } });

    if (!user || !badge) throw new Error('User or Badge not found');

    const badgeRequest = this.badgeRequestRepository.create({
      user,
      badge,
      status: BadgeRequestStatusEnum.PENDING,
    });

    const savedRequest = await this.badgeRequestRepository.save(badgeRequest);

    this.badgeRequestGateway.handleNewBadgeRequest(savedRequest);

    return savedRequest;
  }

  async getAllRequests(filter: { status?: string }): Promise<BadgeRequest[]> {
    return this.badgeRequestRepository.find({
      where: filter,
      relations: ['user', 'badge'],
    });
  }
  

  async updateRequest(id: number, status: string): Promise<BadgeRequest> {
    const request = await this.badgeRequestRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    request.status = status;
    const updatedRequest = await this.badgeRequestRepository.save(request);

    this.badgeRequestGateway.handleBadgeRequestStatusUpdated({
      userId: request.user.id,
      status,
      requestId: updatedRequest.id,
    });

    return updatedRequest;
  }


  async getUserBadges(userId: number): Promise<Badge[]> {
    const badgeRequests = await this.badgeRequestRepository.find({
      where: {
        user: { id: userId },
        status: BadgeRequestStatusEnum.ACCEPTED,
      },
      relations: ['badge'],
    });
  
    return badgeRequests.map((request) => request.badge);
  }
}
