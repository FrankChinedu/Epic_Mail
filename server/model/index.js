import { Pool } from 'pg';

const connectionString = process.env.DEV_DB;

const pool = new Pool(
  { connectionString }
);

pool.connect();

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL NOT NULL UNIQUE,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        avatar VARCHAR(128),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      )`;
  pool
    .query(queryText)
    .then(() => {
      // console.log(res);
      pool.end();
    })
    .catch(() => {
      // console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool
    .query(queryText)
    .then(() => {
      // console.log(res);
      pool.end();
    })
    .catch(() => {
      // console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
};

export { createUserTable, dropUserTable, createAllTables };
