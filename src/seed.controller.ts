import { Controller, Post } from '@nestjs/common';
import { BadgeService } from 'src/modules/badge/badge.service';
import { UserService } from 'src/modules/user/user.service';
import { UserRoleEnum } from './enums/UserRoleEnum';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
  ) {}

  @Post()
  async seedData() {
    const badges = [
      { name: 'MADERA', levelRequired: 10 },
      { name: 'HIERRO', levelRequired: 15 },
      { name: 'BRONCE', levelRequired: 25 },
      { name: 'PLATA', levelRequired: 40 },
      { name: 'ORO', levelRequired: 60 },
      { name: 'PLATINIUM', levelRequired: 85 },
      { name: 'DIAMANTE', levelRequired: 115 },
      { name: 'INMORTAL', levelRequired: 150 },
      { name: 'RADIANTE', levelRequired: 190 },
    ];

    await Promise.all(badges.map((badge) => this.badgeService.createBadge(badge)));

    await this.userService.createUser('admin@apuestatotal.com', 'admin123', UserRoleEnum.ADMIN);
    await this.userService.createUser('user1@apuestatotal.com', 'user123', UserRoleEnum.USER);

    return { message: 'Seed data inserted successfully' };
  }
}
