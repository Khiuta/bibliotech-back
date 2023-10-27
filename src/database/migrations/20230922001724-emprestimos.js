/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('emprestimos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    livro: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tombo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    aluno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    turma: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    serie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_entrega: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    entregue: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('emprestimos'),
};
