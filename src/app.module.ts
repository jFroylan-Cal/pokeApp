import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    PokemonModule,
    MongooseModule.forRoot(process.env.MONGODB),
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
