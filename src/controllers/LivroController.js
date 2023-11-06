import moment from 'moment';
import Livro from '../models/Livro';
import Emprestimo from '../models/Emprestimo';

class LivroController {
  async store(req, res) {
    try {
      const novoLivro = await Livro.create(req.body);
      return res.status(200).json(novoLivro);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.json(e);
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
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;

      const livro = await Livro.findOne({
        where: {
          id,
        },
      });

      await Livro.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json(`${livro.nome} apagado.`);
    } catch (e) {
      return console.log(e);
    }
  }

  async edit(req, res) {
    try {
      let {
        nome,
        autor,
        quantidade,
        ano,
        edicao,
        editora,
      } = req.body;
      const { id } = req.params;

      const livro = await Livro.findOne({
        where: {
          id,
        },
      });

      if (nome === '') nome = livro.nome;
      if (autor === '') autor = livro.autor;
      if (quantidade === '') quantidade = livro.quantidade;
      if (ano === '') ano = livro.ano;
      if (edicao === '') edicao = livro.edicao;
      if (editora === '') editora = livro.editora;

      await Livro.update({
        nome, autor, quantidade, ano, edicao, editora,
      }, {
        where: {
          id,
        },
      });

      return res.status(200).json(`${livro.nome} editado.`);
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new LivroController();
