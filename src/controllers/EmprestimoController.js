import moment from 'moment';
import Emprestimo from '../models/Emprestimo';
import Aluno from '../models/Aluno';

class EmprestimoController {
  async store(req, res) {
    try {
      const { aluno, turma, serie } = req.body;

      const garanteUnico = await Aluno.findOne({
        where: {
          aluno,
          turma,
          serie,
        },
      });

      if (!garanteUnico) {
        await Aluno.create({ aluno, turma, serie });
        const novoEmprestimo = await Emprestimo.create(req.body);
        return res.status(200).json(novoEmprestimo);
      }

      if (garanteUnico) {
        if (garanteUnico.disponivel === false) {
          return res.status(200).json('erro');
        }
      }

      const novoEmprestimo = await Emprestimo.create(req.body);
      await Aluno.update({ disponivel: false }, {
        where: {
          id: garanteUnico.id,
        },
      });

      return res.status(200).json(novoEmprestimo);
    } catch (e) {
      // if (e.errors) {
      //   return res.status(400).json({
      //     errors: e.errors.map((err) => err.message),
      //   });
      // }
      return console.log(e);
    }
  }

  async index(req, res) {
    try {
      const emprestimos = await Emprestimo.findAll({
        where: {
          entregue: false,
        },
      });

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

      return res.status(200).json(emprestimos);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async showEmprestados(req, res) {
    try {
      const emprestados = await Emprestimo.findAll({
        where: {
          status: 'emprestado',
          entregue: false,
        },
      });

      return res.status(200).json(emprestados);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async showPendentes(req, res) {
    try {
      const pendentes = await Emprestimo.findAll({
        where: {
          status: 'pendente',
          entregue: false,
        },
      });

      return res.status(200).json(pendentes);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async update(req, res) {
    const { id } = req.body;

    const emprestimo = await Emprestimo.findOne({
      where: {
        id,
      },
    });

    await Aluno.update({ disponivel: true }, {
      where: {
        aluno: emprestimo.aluno,
      },
    });

    await Emprestimo.update({ entregue: true }, {
      where: {
        id,
      },
    });

    return res.status(200).json('atualizado');
  }
}

export default new EmprestimoController();
