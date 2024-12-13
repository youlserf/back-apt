import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgeRequest } from 'src/entities/badge-request.entity';
import { Pokemon } from 'src/entities/pokemon.entity';
import { User } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/UserRoleEnum';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BadgeRequest)
    private readonly badgeRequestRepository: Repository<BadgeRequest>
  ) {}

  async createUser(email: string, password: string, role: UserRoleEnum = UserRoleEnum.USER): Promise<User> {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async registerPokemons(userId: number, pokemonsData: any[]): Promise<Pokemon[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['pokemons'],
    });

    if (!user) throw new Error('User not found');

    const pokemons = pokemonsData.map(pokemonData => {
      const pokemon = this.pokemonRepository.create({
        name: pokemonData.pokemon_name,
        power: pokemonData.pokemon_power,
        user,
      });
      return pokemon;
    });

    return this.pokemonRepository.save(pokemons);
  }

  async getUserBadges(userId: number): Promise<any[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badgeRequests', 'badgeRequests.badge'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.badgeRequests;
  }
}
