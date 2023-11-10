import moment from 'moment';
import Livro from '../models/Livro';
import Emprestimo from '../models/Emprestimo';

class LivroController {
  async store(req, res) {
    try {
      let i = 0;

      const {
        nome,
        autor,
        quantidade,
        ano,
        edicao,
        editora,
      } = req.body;

      do {
        Livro.create({
          nome, autor, ano, edicao, editora,
        });

        i++;
      } while (i < quantidade);

      return res.status(200).json(`${quantidade} ${nome} cadastrados.`);
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
      const livros = await Livro.findAll({
        order: [['id', 'ASC']],
      });
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

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id || id === undefined) {
        return res.status(200);
      }

      const livro = await Livro.findOne({
        where: {
          id,
        },
      });

      return res.status(200).json(livro);
    } catch (e) {
      return console.log('erro do show');
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

  async update(req, res) {
    try {
      const {
        nome,
        autor,
        ano,
        edicao,
        editora,
      } = req.body;

      let {
        nome_livro,
        autor_livro,
        ano_livro,
        edicao_livro,
        editora_livro,
      } = req.body;

      const livro = await Livro.findAll({
        where: {
          nome: nome_livro,
          autor: autor_livro,
          ano: ano_livro,
          edicao: edicao_livro,
          editora: editora_livro,
        },
      });

      if (nome === '') nome_livro = livro.nome_livro;
      if (autor === '') autor_livro = livro.autor_livro;
      if (ano === '') ano_livro = livro.ano_livro;
      if (edicao === '') edicao_livro = livro.edicao_livro;
      if (editora === '') editora_livro = livro.editora_livro;

      await Livro.update({
        nome,
        autor,
        ano,
        edicao,
        editora,
      }, {
        where: {
          nome: nome_livro,
          autor: autor_livro,
          ano: ano_livro,
          edicao: edicao_livro,
          editora: editora_livro,
        },
      });

      return res.status(200).json(`Livro ${livro.nome} atualizado.`);
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new LivroController();
