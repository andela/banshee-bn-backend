import dotenv from 'dotenv';

dotenv.config();

const { DB_DEV_NAME, DB_USER_NAME, DB_PASSWORD } = process.env;
const dialect = 'postgres';

module.exports = {
  development: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_DEV_NAME,
    host: '127.0.0.1',
    port: process.env.DB_PORT,
    logging: false,
    dialect
  },
  test: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
    logging: false,
    dialect,
    ssl: true
  }
};
