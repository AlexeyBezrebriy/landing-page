'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Deals.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      yield: DataTypes.STRING,
      daysLeft: DataTypes.INTEGER,
      soldPercentage: DataTypes.STRING,
      ticket: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Deals',
    },
  );
  return Deals;
};
