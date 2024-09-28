import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/configuration';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    DealsModule,
  ],
})
export class AppModule {}
