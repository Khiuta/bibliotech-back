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
      ano: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0,
      },
      edicao: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0,
      },
      editora: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
    });
    return this;
  }
}
