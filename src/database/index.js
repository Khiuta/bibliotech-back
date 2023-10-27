import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Livro from '../models/Livro';
import Emprestimo from '../models/Emprestimo';
import Usuario from '../models/Usuario';
import Aluno from '../models/Aluno';

const models = [Livro, Emprestimo, Usuario, Aluno];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
