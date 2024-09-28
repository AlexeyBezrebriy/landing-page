import { IsNotEmpty } from 'class-validator';

export class CreateDealDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly price: string;

  @IsNotEmpty()
  readonly yield: string;

  @IsNotEmpty()
  readonly daysLeft: number;

  @IsNotEmpty()
  readonly soldPercentage: string;

  @IsNotEmpty()
  readonly ticket: string;

  readonly imageUrl: string;
}
