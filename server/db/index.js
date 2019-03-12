import { Pool } from 'pg';

const connectionString = process.env.DEV_DB;

const pool = new Pool({ connectionString });

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export default {
  query
}

// lifted from https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7 