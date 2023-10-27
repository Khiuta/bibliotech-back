import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      login: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 24],
            msg: 'O nome de usuário deve ter de 4 a 24 caracteres.',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 18],
            msg: 'A senha deve ter de 6 a 18 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      user.senha_hash = await bcryptjs.hash(user.senha, 8);
    });

    return this;
  }

  passwordIsValid(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}
