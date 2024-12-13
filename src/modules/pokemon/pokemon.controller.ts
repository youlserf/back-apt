import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fastcsv from 'fast-csv';
import { Pokemon } from 'src/entities/pokemon.entity';
import { PokemonService } from './pokemon.service';

import { JwtAuthGuard } from 'src/security/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPokemonCsv(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    const userId = req.user.id;
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    if (file.mimetype !== 'text/csv') {
      throw new HttpException('Only CSV files are allowed', HttpStatus.BAD_REQUEST);
    }

    const pokemons = await this.parseCsv(file.buffer);

    return this.pokemonService.registerPokemons(pokemons, userId);
  }

  private async parseCsv(buffer: Buffer): Promise<any[]> {
    const pokemons: any[] = [];
    return new Promise((resolve, reject) => {
      fastcsv
        .parseString(buffer.toString(), { headers: true })
        .on('data', (row) => {
          const { pokemon_name, pokemon_power } = row;

          if (!pokemon_name || !pokemon_power) {
            reject(
              new HttpException(
                'Invalid CSV format. Columns required: pokemon_name, pokemon_power',
                HttpStatus.BAD_REQUEST,
              ),
            );
          }

          pokemons.push({
            name: pokemon_name,
            power: parseInt(pokemon_power),
          });
        })
        .on('end', () => resolve(pokemons))
        .on('error', (err) => reject(err));
    });
  }

  @Get('user/:userId')
  async getPokemons(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.pokemonService.getPokemons(userId);
  }
}
