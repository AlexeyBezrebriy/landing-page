import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Deal extends Model {
  @Column
  name: string;

  @Column
  price: string;

  @Column
  yield: string;

  @Column
  daysLeft: number;

  @Column
  soldPercentage: string;

  @Column
  ticket: string;

  @Column(DataType.STRING(1024))
  imageUrl: string;
}
