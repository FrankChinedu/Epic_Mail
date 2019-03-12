import { Pool } from 'pg';

const connectionString = process.env.DEV_DB;

const pool = new Pool({ connectionString });

const query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  query,
};
