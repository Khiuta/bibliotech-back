/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('alunos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    aluno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    turma: {
      type: Sequelize.STRING,
    },
    serie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    disponivel: {
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

  down: (queryInterface) => queryInterface.dropTable('alunos'),
};
