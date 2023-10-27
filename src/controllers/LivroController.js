import moment from 'moment';
import Livro from '../models/Livro';
import Emprestimo from '../models/Emprestimo';

class LivroController {
  async store(req, res) {
    try {
      const novoLivro = await Livro.create(req.body);
      return res.status(200).json(novoLivro);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const livros = await Livro.findAll();
      const emprestimos = await Emprestimo.findAll();

      const hoje = moment().format();

      emprestimos.forEach(async (emp) => {
        const { id } = emp;
        if (moment(hoje).isSameOrAfter(emp.data_entrega)) {
          await Emprestimo.update({ status: 'pendente' }, {
            where: {
              id,
            },
          });
        }
      });

      return res.status(200).json(livros);
    } catch {
      return res.status(400).json('Solicitação mal sucedida');
    }
  }
}

export default new LivroController();
