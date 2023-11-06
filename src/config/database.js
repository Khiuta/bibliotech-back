require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME_MIGUEL,
  password: process.env.PASSWORD,
  database: process.env.DB,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
