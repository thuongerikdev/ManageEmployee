'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
    */
    await queryInterface.bulkInsert('user', [
      {
      username: 'fake1',
      password: 'fake1',
      email: 'fake1@gmail.com'
      
    },
    {
      username: 'fake2',
      password: 'fake2',
      email: 'fake2@gmail.com'
      
    },
    {
      username: 'fake3',
      password: 'fake3',
      email: 'fake3@gmail.com'
      
    },
  
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
