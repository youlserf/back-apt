import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadgeRequestModule } from './modules/badge-request/badge-request.module';
import { BadgeModule } from './modules/badge/badge.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './security/auth.module';
import { SeedModule } from './seed.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BadgeModule,
    UserModule,
    PokemonModule,
    BadgeRequestModule,
    SeedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    //MongooseModule.forRoot(process.env.MONGO_URI),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
