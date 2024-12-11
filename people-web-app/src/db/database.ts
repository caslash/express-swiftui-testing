import pg from 'pg';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PWD as string,
  {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
  },
);

export default sequelize;
