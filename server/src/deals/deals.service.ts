import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from './deals.model';
import { CreateDealDto } from './dto/create-deals.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectModel(Deal)
    private dealsModel: typeof Deal,
  ) {}

  async create(createDealDto: CreateDealDto) {
    const deal = new Deal();
    const existingByDealName = await this.dealsModel.findOne({
      where: { name: createDealDto.name },
    });

    if (existingByDealName) {
      return { warningMessage: 'Deal with this name already exists' };
    }

    deal.name = createDealDto.name;
    deal.price = createDealDto.price;
    deal.yield = createDealDto.yield;
    deal.daysLeft = createDealDto.daysLeft;
    deal.soldPercentage = createDealDto.soldPercentage;
    deal.ticket = createDealDto.ticket;
    deal.imageUrl = createDealDto.imageUrl
      ? createDealDto.imageUrl
      : 'https://images.pexels.com/photos/4397217/pexels-photo-4397217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    return deal.save();
  }

  async getAll() {
    return this.dealsModel.findAll();
  }
}
