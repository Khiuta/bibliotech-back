import Sequelize, { Model } from 'sequelize';

export default class Livro extends Model {
  static init(sequelize) {
    super.init({
      tombo: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Informe o tombo do livro',
          },
        },
      },
      nome: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Informe o nome do livro',
          },
        },
      },
      autor: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Informe o autor do livro',
          },
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Informe a quantidade de livros',
          },
        },
      },
      data_chegada: Sequelize.STRING,
      data_lancamento: Sequelize.STRING,
      volume: Sequelize.INTEGER,
      edicao: Sequelize.INTEGER,
      local: Sequelize.STRING,
      editora: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
