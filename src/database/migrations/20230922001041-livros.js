/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('livros', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ano: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    edicao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    editora: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('livros'),
};
