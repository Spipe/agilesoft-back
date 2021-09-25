const { NODE_ENV, DB, DB_TEST } = process.env;
const DataBase = NODE_ENV === "test" ? DB_TEST : DB;

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: DataBase,
};
