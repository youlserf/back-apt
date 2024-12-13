import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BadgeRequestStatusEnum } from '../enums/BadgeRequestStatusEnum';
import { Badge } from './badge.entity';
import { User } from './user.entity';

@Entity()
export class BadgeRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.badgeRequests)
  user: User;

  @ManyToOne(() => Badge)
  badge: Badge;

  @Column({ default: BadgeRequestStatusEnum.PENDING })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
