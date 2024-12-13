import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeRequest } from 'src/entities/badge-request.entity';
import { Badge } from 'src/entities/badge.entity';
import { Pokemon } from 'src/entities/pokemon.entity';
import { User } from 'src/entities/user.entity';
import { BadgeRequestModule } from '../badge-request/badge-request.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [BadgeRequestModule ,TypeOrmModule.forFeature([Pokemon, User, Badge, BadgeRequest])],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [TypeOrmModule],
})
export class PokemonModule {}
