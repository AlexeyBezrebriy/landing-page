import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DealsController } from './deals.controller';
import { Deal } from './deals.model';
import { DealsService } from './deals.service';

@Module({
  imports: [SequelizeModule.forFeature([Deal])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
