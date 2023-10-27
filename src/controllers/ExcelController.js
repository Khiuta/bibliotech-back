import excel from 'exceljs';
import Livro from '../models/Livro';

class ExcelController {
  async index(req, res) {
    try {
      const workbook = new excel.Workbook();

      const sheet = workbook.addWorksheet('Acervo Biblioteca LHVR');
      sheet.columns = [
        { header: 'Nome', key: 'nome', width: 40 },
        { header: 'Autor', key: 'autor', width: 100 },
        { header: 'Tombo', key: 'tombo', width: 25 },
        { header: 'Quantidade', key: 'quantidade', width: 25 },
        { header: 'Data de chegada', key: 'data_chegada', width: 50 },
        { header: 'Data de lançamento', key: 'data_lancamento', width: 50 },
        { header: 'Volume', key: 'volume', width: 100 },
        { header: 'Edição', key: 'edicao', width: 100 },
        { header: 'Local', key: 'local', width: 100 },
        { header: 'Editora', key: 'editora', width: 100 },
      ];

      const livros = await Livro.findAll();

      await livros.map((value) => {
        sheet.addRow({
          nome: value.nome,
          autor: value.autor,
          tombo: value.tombo,
          quantidade: value.quantidade,
          data_chegada: value.data_chegada,
          data_lancamento: value.data_lancamento,
          volume: value.volume,
          edicao: value.edicao,
          local: value.local,
          editora: value.editora,
        });
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment;filename=AcervoLHVR.xlsx',
      );

      workbook.xlsx.write(res);
    } catch {
      console.log('deu errado');
    }
  }
}

export default new ExcelController();
