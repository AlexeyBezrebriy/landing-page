'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Deals', [
      ...Array(4).map(() => ({
        name: 'The Marina Torch',
        price: '6 000 000',
        yield: '9.42%',
        daysLeft: 150,
        soldPercentage: '75%',
        ticket: '60 000',
        imageUrl: 'https://images.pexels.com/photos/4397217/pexels-ph...',
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Deals', null, {});
  },
};
