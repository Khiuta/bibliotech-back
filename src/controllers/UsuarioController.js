import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      return res.json(novoUsuario);
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new UsuarioController();
