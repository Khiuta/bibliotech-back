/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => queryInterface.removeColumn('livros', 'quantidade'),

  down: async () => {

  },
};
