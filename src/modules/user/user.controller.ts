import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/security/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() body: { email: string; password: string }): Promise<User> {
    return this.userService.createUser(body.email, body.password);
  }

  @Get('badges/:userId')
  async getUserBadges(@Param('userId') userId: number) {
    return this.userService.getUserBadges(userId);
  }
}
