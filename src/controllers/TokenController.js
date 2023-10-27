import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

class TokenController {
  async store(req, res) {
    const { login = '', senha = '' } = req.body;

    if (!login || !senha) {
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const user = await Usuario.findOne({ where: { login } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inexistente.'],
      });
    }

    if (!(await user.passwordIsValid(senha))) {
      return res.status(401).json({
        errors: ['Senha incorreta.'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, login }, process.env.TOKEN_SECRET, {
      expiresIn: '12h',
    });

    return res.json({ token, user: { login: user.login, id } });
  }
}

export default new TokenController();
