import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();
      return res.status(200).json(alunos);
    } catch (e) {
      return res.status(400).json('deu errado');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.body;

      const busca = await Aluno.findOne({
        where: {
          id,
        },
      });

      if (busca) {
        return res.status(200).json(busca);
      }

      return res.status(200);
    } catch {
      return res.status(400).json('nao deu');
    }
  }
}

export default new AlunoController();
