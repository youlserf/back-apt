import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/entities/badge.entity';
import { Pokemon } from 'src/entities/pokemon.entity';
import { User } from 'src/entities/user.entity';
import { BadgeRequestService } from 'src/modules/badge-request/badge-request.service';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    private readonly badgeRequestService: BadgeRequestService, 
  ) {}

  async getPokemons(userId: number): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: { user: { id: userId } },
    });
  }

  async registerPokemons(pokemons: any[], userId: number): Promise<Pokemon[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const createdPokemons: any[] = pokemons.map((data) =>
      this.pokemonRepository.create({
        ...data, 
        user,
      })
    );
    const savedPokemons = await this.pokemonRepository.save(createdPokemons);

    const pokemonCount = await this.pokemonRepository.count({ where: { user: { id: userId } } });
    await this.assignBadge(userId, pokemonCount);

    return savedPokemons;
  }

  private async assignBadge(userId: number, pokemonCount: number): Promise<void> {
    const badges = await this.badgeRepository.find({
      where: { levelRequired: LessThanOrEqual(pokemonCount) },
      order: { levelRequired: 'DESC' }, 
    });

    if (badges.length > 0) {
      const badge = badges[0]; 
      await this.badgeRequestService.createRequest(userId, badge.id); 
    }
  }
}
