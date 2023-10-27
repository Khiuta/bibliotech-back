/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('livros', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tombo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    data_chegada: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_lancamento: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    volume: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    edicao: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    local: {
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
