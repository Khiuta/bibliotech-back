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

        await Livro.create({ nome, autor, ano, quantidade, edicao, editora});

        i++;
      } while (i < quantidade) 

      return res.status(200).json(`${quantidade} ${nome} cadastrados.`)
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

      const livro = await Livro.findOne({
        where: {
          id,
        },
      });

      return res.status(200).json(livro);
    } catch (e) {
      return console.log(e);
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
      const { id } = req.params;

      let {
        nome, 
        autor,
        ano,
        edicao,
        editora,
      } = req.body;

      const livro = await Livro.findOne({
        where: {
          id,
        },
      });

      if (nome === '') nome = livro.nome;
      if (autor === '') autor = livro.autor;
      if (ano === '') ano = livro.ano;
      if (edicao === '') edicao = livro.edicao;
      if (editora === '') editora = livro.editora;

      await Livro.update({
        nome, 
        autor,
        ano,
        edicao,
        editora,
      }, {
        where: {
          id,
        },
      });

      return res.status(200).json(`Livro ${livro.nome} atualizado.`);
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new LivroController();
