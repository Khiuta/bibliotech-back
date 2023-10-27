import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();
import './src/database';
import express from 'express';

import emprestimoRoutes from './src/routes/emprestimoRoutes';
import livroRoutes from './src/routes/livroRoutes';
import excelRoutes from './src/routes/excelRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import alunoRoutes from './src/routes/alunoRoutes';

const whiteList = [
  'http://localhost:3000',
  'https://lhvr-bibliotech-fs83px6tc-khiuta.vercel.app/',
  'http://20.20.1.223:3000'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/emprestimos', emprestimoRoutes);
    this.app.use('/livros', livroRoutes);
    this.app.use('/excel', excelRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/alunos', alunoRoutes);
  }
}

export default new App().app;
