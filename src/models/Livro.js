import Sequelize, { Model } from 'sequelize';

export default class Livro extends Model {
  static init(sequelize) {
    super.init({
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
      ano: Sequelize.INTEGER,
      edicao: Sequelize.INTEGER,
      editora: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
