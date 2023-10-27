import Sequelize, { Model } from 'sequelize';
import moment from 'moment';

export default class Emprestimo extends Model {
  static init(sequelize) {
    super.init({
      livro: {
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
      tombo: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Informe o tombo do livro',
          },
        },
      },
      aluno: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Informe o nome do aluno',
          },
        },
      },
      turma: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Informe a turma do aluno',
          },
        },
      },
      serie: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Informe a série do aluno',
          },
        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'emprestado',
      },
      data_entrega: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      entregue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', (emprestimo) => {
      emprestimo.data_entrega = moment().add(15, 'days').format();
    });

    return this;
  }
}
