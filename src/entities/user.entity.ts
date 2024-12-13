import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import { BadgeRequest } from './badge-request.entity';
import { Pokemon } from './pokemon.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.user)
  pokemons: Pokemon[];

  @OneToMany(() => BadgeRequest, (badgeRequest) => badgeRequest.user)
  badgeRequests: BadgeRequest[];
}