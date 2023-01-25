import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async feedDatabase() {
    this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=50',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
      //const pokemon = await this.pokemonModel.create({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}
