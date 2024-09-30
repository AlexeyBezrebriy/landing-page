'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      yield: {
        type: Sequelize.STRING,
      },
      daysLeft: {
        type: Sequelize.INTEGER,
      },
      soldPercentage: {
        type: Sequelize.STRING,
      },
      ticket: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING(1024),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Deals');
  },
};
